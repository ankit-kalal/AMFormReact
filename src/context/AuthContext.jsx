import React, { createContext, useContext, useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [isCheckingRole, setIsCheckingRole] = useState(false);
  const [hasCheckedRole, setHasCheckedRole] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Get initial session only once
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      
      authService.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Log access token
        if (session?.access_token) {
          console.log('🔑 Access Token:', session.access_token);
          console.log('📋 Full Session:', session);
          console.log('📋 session?.user:', session?.user);
        }
        
        setLoading(false);
        
        // Set user role based on authentication status
        if (session?.user) {
          const userRole = session.user.email === 'dev01@amts.com' ? 'admin' : 'user';
          setUserRole(userRole);
          setHasCheckedRole(true);
          
          // Navigate based on user role if authenticated and only on root/login paths
          // Use React Router's location.pathname which works correctly with HashRouter
          const currentPath = location.pathname;
          
          // Only redirect if we're actually on a login/root page, not on any other route
          if (currentPath === '/' || currentPath === '/login' || currentPath === '/authentication/sign-in/basic') {
            const redirectPath = userRole === 'admin' ? '/dashboards/analytics' : '/dashboards/analytics';
            console.log(`🔄 Redirecting ${userRole} to ${redirectPath}`);
            navigate(redirectPath);
          }
        }
      });
    }

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      console.log('🔄 Auth Event:', event);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      // Log access token on auth changes
      if (session?.access_token) {
        console.log('🔑 Access Token (Auth Change):', session.access_token);
        console.log('📋 Full Session (Auth Change):', session);
        console.log('👤 User Info:', session.user);
      } else {
        console.log('❌ No session/token available');
      }
      
      setLoading(false);
      
      // Handle role and navigation based on auth state
      if (session?.user) {
        const userRole = session.user.email === 'dev01@amts.com' ? 'admin' : 'user';
        setUserRole(userRole);
        setHasCheckedRole(true);
        
        // Only navigate on SIGNED_IN event, not on TOKEN_REFRESHED or other events
        if (event === 'SIGNED_IN') {
          // Use React Router's location.pathname which works correctly with HashRouter
          const currentPath = location.pathname;
          
          // Only redirect if on root or login page, not if already on a valid route
          if (currentPath === '/' || currentPath === '/login' || currentPath === '/authentication/sign-in/basic') {
            const redirectPath = userRole === 'admin' ? '/dashboards/analytics' : '/dashboards/analytics';
            console.log(`🔄 User signed in as ${userRole}, redirecting to ${redirectPath}`);
            navigate(redirectPath);
          }
        }
      } else {
        setUserRole(null);
        setHasCheckedRole(false);
        
        // Navigate to login on sign out
        if (event === 'SIGNED_OUT') {
          console.log('🔄 User signed out, redirecting to /authentication/sign-in/basic');
          navigate('/authentication/sign-in/basic');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  const signUp = async (email, password) => {
    const { data, error } = await authService.signUp(email, password);
    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await authService.signIn(email, password);
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await authService.signOut();
    return { error };
  };

  // Stabilize session object to prevent unnecessary re-renders and API calls
  // Only recreate if the actual session data changes (access_token or user)
  const stableSession = useMemo(() => {
    if (!session) return null;
    
    return {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at,
      expires_in: session.expires_in,
      token_type: session.token_type,
      user: session.user ? {
        id: session.user.id,
        email: session.user.email,
        // Include other user properties if needed
        ...session.user
      } : null
    };
  }, [session?.access_token, session?.user?.id, session?.user?.email]);

  const value = {
    user,
    session: stableSession, // Use stabilized session
    loading,
    isAuthenticated: !!user,
    isLoading: loading || isCheckingRole,
    userRole,
    hasCheckedRole,
    isCheckingRole,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

