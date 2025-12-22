/**
 * Apps Service
 * Handles all form app-related API operations
 */

import { API_BASE_URL, getAuthHeaders, handleResponse, formatDate } from '../config';

/**
 * Get all form apps
 * @param {Object} session - Supabase session object
 * @returns {Promise<Object>} Result object with success status and data array
 */
export const getFormApps = async (session) => {
  try {
    const headers = await getAuthHeaders(session);
    const response = await fetch(`${API_BASE_URL}/form_apps/`, {
      method: 'GET',
      headers: headers
    });
    
    const data = await handleResponse(response);
    
    // Transform the API data to match the expected format
    const transformedData = data.map(app => {
      // Determine status - default to 'active' if status_value is null or not provided
      const status = app.status_value && 
        (app.status_value === 'inactive' || app.status_value === 'active') 
        ? app.status_value 
        : 'active';
      
      return {
        id: app.id,
        app_name: app.app_name,
        description: '', // API doesn't provide description
        version: '1.0.0', // API doesn't provide version, default to 1.0.0
        status: status,
        form_count: 0, // API doesn't provide form_count
        created_at: formatDate(app.created_at),
        updated_at: formatDate(app.updated_at),
        created_by: '' // API doesn't provide created_by
      };
    });
    
    return {
      success: true,
      data: transformedData
    };
  } catch (error) {
    console.error('Error fetching form apps:', error);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

