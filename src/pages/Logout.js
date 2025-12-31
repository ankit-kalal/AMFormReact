import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import MDBox from "components/MDBox";

function Logout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    const handleLogout = async () => {
      if (hasLoggedOut.current) return; // Prevent multiple calls
      hasLoggedOut.current = true;

      try {
        // Clear localStorage before signing out
        try {
          localStorage.clear();
          console.log('🧹 LocalStorage cleared on logout');
        } catch (storageError) {
          console.error('Error clearing localStorage:', storageError);
        }
        
        // Sign out and wait for it to complete
        const { error } = await signOut();
        if (error) {
          console.error("Error during logout:", error);
        }
        
        // Wait longer to ensure session is fully cleared and auth state updates
        // This prevents the login page from detecting a stale session
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Navigate to login page after sign out
        navigate("/authentication/sign-in/basic", { replace: true });
      } catch (error) {
        console.error("Error during logout:", error);
        // Still navigate to login even if there's an error
        navigate("/authentication/sign-in/basic", { replace: true });
      }
    };

    handleLogout();
  }, [signOut, navigate]);

  return (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      Signing out...
    </MDBox>
  );
}

export default Logout;

