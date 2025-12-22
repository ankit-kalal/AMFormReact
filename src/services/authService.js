import { supabase } from '../utils/supabase'

export const authService = {
  // Sign up new user
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  // Sign in existing user
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign out user
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession()
    return { data, error }
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

