/**
 * Forms Service
 * Handles all form-related API operations
 */

import { API_BASE_URL, getAuthHeaders, handleResponse, formatDate } from '../config';

/**
 * Get all forms
 * @param {Object} session - Supabase session object
 * @returns {Promise<Object>} Result object with success status and data array
 */
export const getForms = async (session) => {
  try {
    const headers = await getAuthHeaders(session);
    const response = await fetch(`${API_BASE_URL}/forms/`, {
      method: 'GET',
      headers: headers
    });
    
    const data = await handleResponse(response);
    
    // Transform the API data to match our grid format
    const transformedData = data.map(form => ({
      id: form.guid,
      name: form.name,
      createdAt: formatDate(form.create_date),
      updatedAt: formatDate(form.create_date),
      active: form.is_active,
      json: form.json
    }));
    
    return {
      success: true,
      data: transformedData
    };
  } catch (error) {
    console.error('Error fetching forms:', error);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

