import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import appsReducer from './slices/appsSlice';
import organizationsReducer from './slices/organizationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    apps: appsReducer,
    organizations: organizationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

