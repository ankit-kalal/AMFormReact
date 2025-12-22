/**
 * Groups Service
 * Handles all group-related API operations
 */

import { API_BASE_URL, getAuthHeaders, handleResponse, formatDate } from '../config';

/**
 * Get all groups
 * @param {Object} session - Supabase session object
 * @returns {Promise<Object>} Result object with success status and data array
 */
export const getGroups = async (session) => {
  try {
    const headers = await getAuthHeaders(session);
    const response = await fetch(`${API_BASE_URL}/groups/`, {
      method: 'GET',
      headers: headers
    });
    
    const data = await handleResponse(response);
    
    // Transform the API data to match the expected format
    const transformedData = data.map(group => ({
      id: group.id,
      name: group.group_name,
      description: '', // API doesn't provide description
      member_count: 0, // API doesn't provide member_count
      status: 'active', // Default to active since status_id is a UUID reference
      created_at: formatDate(group.created_at),
      updated_at: formatDate(group.updated_at)
    }));
    
    return {
      success: true,
      data: transformedData
    };
  } catch (error) {
    console.error('Error fetching groups:', error);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

