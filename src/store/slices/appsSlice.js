import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getFormApps, 
  getFormAppById, 
  createFormApp, 
  updateFormApp, 
  deleteFormApp 
} from 'api/services/appsService';

// Async thunk for fetching apps
export const fetchApps = createAsyncThunk(
  'apps/fetchApps',
  async (session, { rejectWithValue }) => {
    try {
      const result = await getFormApps(session);
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.error || 'Failed to fetch apps');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch apps');
    }
  }
);

// Async thunk for fetching app by ID
export const fetchAppById = createAsyncThunk(
  'apps/fetchAppById',
  async ({ session, appId }, { rejectWithValue }) => {
    try {
      const result = await getFormAppById(session, appId);
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.error || 'Failed to fetch app');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch app');
    }
  }
);

// Async thunk for creating app
export const createApp = createAsyncThunk(
  'apps/createApp',
  async ({ session, appData }, { rejectWithValue }) => {
    try {
      const result = await createFormApp(session, appData);
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.error || 'Failed to create app');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create app');
    }
  }
);

// Async thunk for updating app
export const updateApp = createAsyncThunk(
  'apps/updateApp',
  async ({ session, appId, appData }, { rejectWithValue }) => {
    try {
      const result = await updateFormApp(session, appId, appData);
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.error || 'Failed to update app');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update app');
    }
  }
);

// Async thunk for deleting app
export const deleteApp = createAsyncThunk(
  'apps/deleteApp',
  async ({ session, appId }, { rejectWithValue }) => {
    try {
      const result = await deleteFormApp(session, appId);
      if (result.success) {
        return appId; // Return the deleted app ID
      } else {
        return rejectWithValue(result.error || 'Failed to delete app');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete app');
    }
  }
);

const initialState = {
  apps: [],
  currentApp: null,
  loading: false,
  loadingAppDetails: false,
  creating: false,
  updating: false,
  deleting: false,
  error: null,
  lastFetched: null,
  lastAccessToken: null,
};

const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    clearApps: (state) => {
      state.apps = [];
      state.error = null;
      state.lastFetched = null;
      state.lastAccessToken = null;
    },
    clearCurrentApp: (state) => {
      state.currentApp = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch apps
      .addCase(fetchApps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApps.fulfilled, (state, action) => {
        state.loading = false;
        state.apps = action.payload;
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(fetchApps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch apps';
      })
      // Fetch app by ID
      .addCase(fetchAppById.pending, (state) => {
        state.loadingAppDetails = true;
        state.error = null;
      })
      .addCase(fetchAppById.fulfilled, (state, action) => {
        state.loadingAppDetails = false;
        state.currentApp = action.payload;
        state.error = null;
      })
      .addCase(fetchAppById.rejected, (state, action) => {
        state.loadingAppDetails = false;
        state.error = action.payload || 'Failed to fetch app';
      })
      // Create app
      .addCase(createApp.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createApp.fulfilled, (state, action) => {
        state.creating = false;
        state.apps.push(action.payload);
        state.error = null;
      })
      .addCase(createApp.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload || 'Failed to create app';
      })
      // Update app
      .addCase(updateApp.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateApp.fulfilled, (state, action) => {
        state.updating = false;
        state.currentApp = action.payload;
        // Update the app in the list
        const index = state.apps.findIndex(app => app.id === action.payload.id);
        if (index !== -1) {
          state.apps[index] = {
            ...state.apps[index],
            ...action.payload
          };
        }
        state.error = null;
      })
      .addCase(updateApp.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload || 'Failed to update app';
      })
      // Delete app
      .addCase(deleteApp.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteApp.fulfilled, (state, action) => {
        state.deleting = false;
        state.apps = state.apps.filter(app => app.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteApp.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload || 'Failed to delete app';
      });
  },
});

export const { clearApps, clearCurrentApp, setError, clearError } = appsSlice.actions;
export default appsSlice.reducer;

