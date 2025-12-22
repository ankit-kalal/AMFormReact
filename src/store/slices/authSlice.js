import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  session: null,
  isAuthenticated: false,
  loading: true,
  userRole: null,
  hasCheckedRole: false,
  isCheckingRole: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setSession: (state, action) => {
      state.session = action.payload;
      if (action.payload?.user) {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
      state.hasCheckedRole = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCheckingRole: (state, action) => {
      state.isCheckingRole = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.session = null;
      state.isAuthenticated = false;
      state.userRole = null;
      state.hasCheckedRole = false;
      state.error = null;
    },
  },
});

export const {
  setUser,
  setSession,
  setUserRole,
  setLoading,
  setCheckingRole,
  setError,
  clearError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

