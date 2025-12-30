import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL, getAuthHeaders } from 'api/config';

// Async thunk for fetching organizations
export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async (session, { rejectWithValue }) => {
    try {
      const headers = await getAuthHeaders(session);
      const response = await fetch(`${API_BASE_URL}/organization/`, {
        method: 'GET',
        headers: headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform the API data to match the expected format
      return data.map(org => {
        // Generate a code from the organization name (first 3-4 uppercase letters)
        const code = org.org_name
          .split(' ')
          .map(word => word.charAt(0).toUpperCase())
          .join('')
          .substring(0, 4) || org.org_name.substring(0, 4).toUpperCase();
        
        return {
          id: org.id,
          name: org.org_name,
          code: code,
          status: 'active' // Default status since API doesn't provide it
        };
      });
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch organizations');
    }
  }
);

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState: {
    list: [],
    loading: false,
    error: null,
    selectedOrganization: null,
  },
  reducers: {
    setSelectedOrganization: (state, action) => {
      state.selectedOrganization = action.payload;
    },
    clearOrganizations: (state) => {
      state.list = [];
      state.error = null;
      state.selectedOrganization = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        // Set first organization as selected if none is selected
        if (action.payload.length > 0 && !state.selectedOrganization) {
          state.selectedOrganization = {
            id: action.payload[0].id,
            name: action.payload[0].name
          };
        }
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedOrganization, clearOrganizations, clearError } = organizationsSlice.actions;
export default organizationsSlice.reducer;

