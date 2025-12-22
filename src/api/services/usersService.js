/**
 * Users Service
 * Handles all user-related API operations
 */

import { API_BASE_URL, getAuthHeaders, handleResponse } from '../config';

/**
 * Get all users
 * @param {Object} session - Supabase session object
 * @returns {Promise<Object>} Result object with success status and data array
 */
export const getUsers = async (session) => {
  try {
    const headers = await getAuthHeaders(session);
    const response = await fetch(`${API_BASE_URL}/users/`, {
      method: 'GET',
      headers: headers
    });
    
    const data = await handleResponse(response);
    
    // Transform the API data to match the expected format
    const transformedData = data.map(user => {
      // Determine role based on email (same logic as AuthContext)
      const role = user.email === 'dev01@amts.com' ? 'admin' : 'user';
      
      // Extract name from email (use email prefix before @ as name)
      const emailPrefix = user.email.split('@')[0];
      const name = emailPrefix
        .split(/[._-]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') || user.email;
      
      return {
        id: user.id,
        email: user.email,
        role: role,
        status: 'active', // API doesn't provide status, default to 'active'
        created_at: '', // API doesn't provide created_at
        last_login: '', // API doesn't provide last_login
        name: name
      };
    });
    
    return {
      success: true,
      data: transformedData
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

