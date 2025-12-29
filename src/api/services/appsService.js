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
        status_value: app.status_value || 'active',
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

/**
 * Get app by ID
 * @param {Object} session - Supabase session object
 * @param {string|number} appId - App ID
 * @returns {Promise<Object>} Result object with success status and app data
 */
export const getFormAppById = async (session, appId) => {
  try {
    const headers = await getAuthHeaders(session);
    const response = await fetch(`${API_BASE_URL}/form_apps/${appId}`, {
      method: 'GET',
      headers: headers
    });
    
    const data = await handleResponse(response);
    const app = Array.isArray(data) ? data[0] : data;
    
    const status = app.status_value && 
      (app.status_value === 'inactive' || app.status_value === 'active') 
      ? app.status_value 
      : 'active';
    
    return {
      success: true,
      data: {
        id: app.id,
        app_name: app.app_name,
        description: '',
        version: '1.0.0',
        status: status,
        status_value: app.status_value || 'active',
        form_count: app.form_definitions ? app.form_definitions.length : 0,
        created_at: formatDate(app.created_at),
        updated_at: formatDate(app.updated_at),
        created_by: '',
        form_definitions: app.form_definitions || []
      }
    };
  } catch (error) {
    console.error('Error fetching app by ID:', error);
    return {
      success: false,
      error: error.message,
      data: null
    };
  }
};

/**
 * Create a new form app
 * @param {Object} session - Supabase session object
 * @param {Object} appData - App data { app_name, status_value }
 * @returns {Promise<Object>} Result object with success status and created app data
 */
export const createFormApp = async (session, appData) => {
  try {
    const headers = await getAuthHeaders(session);
    const response = await fetch(`${API_BASE_URL}/form_apps/`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        app_name: appData.app_name,
        status_value: appData.status_value || 'active'
      })
    });
    
    const data = await handleResponse(response);
    const app = Array.isArray(data) ? data[0] : data;
    
    const status = app.status_value && 
      (app.status_value === 'inactive' || app.status_value === 'active') 
      ? app.status_value 
      : 'active';
    
    return {
      success: true,
      data: {
        id: app.id,
        app_name: app.app_name,
        description: appData.description || '',
        version: appData.version || '1.0.0',
        status: status,
        status_value: app.status_value || 'active',
        form_count: 0,
        created_at: formatDate(app.created_at),
        updated_at: formatDate(app.updated_at),
        created_by: ''
      }
    };
  } catch (error) {
    console.error('Error creating app:', error);
    return {
      success: false,
      error: error.message,
      data: null
    };
  }
};

/**
 * Update a form app
 * @param {Object} session - Supabase session object
 * @param {string|number} appId - App ID
 * @param {Object} appData - App data { app_name, status_value }
 * @returns {Promise<Object>} Result object with success status and updated app data
 */
export const updateFormApp = async (session, appId, appData) => {
  try {
    const headers = await getAuthHeaders(session);
    const response = await fetch(`${API_BASE_URL}/form_apps/${appId}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        app_name: appData.app_name,
        status_value: appData.status_value || 'active'
      })
    });
    
    const data = await handleResponse(response);
    const app = Array.isArray(data) ? data[0] : data;
    
    const status = app.status_value && 
      (app.status_value === 'inactive' || app.status_value === 'active') 
      ? app.status_value 
      : 'active';
    
    return {
      success: true,
      data: {
        id: app.id,
        app_name: app.app_name,
        description: appData.description || '',
        version: appData.version || '1.0.0',
        status: status,
        status_value: app.status_value || 'active',
        form_count: 0,
        created_at: formatDate(app.created_at),
        updated_at: formatDate(app.updated_at),
        created_by: ''
      }
    };
  } catch (error) {
    console.error('Error updating app:', error);
    return {
      success: false,
      error: error.message,
      data: null
    };
  }
};

/**
 * Delete a form app
 * @param {Object} session - Supabase session object
 * @param {string|number} appId - App ID
 * @returns {Promise<Object>} Result object with success status
 */
export const deleteFormApp = async (session, appId) => {
  try {
    const headers = await getAuthHeaders(session);
    const response = await fetch(`${API_BASE_URL}/form_apps/${appId}`, {
      method: 'DELETE',
      headers: headers
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }
    
    return {
      success: true,
      data: { id: appId }
    };
  } catch (error) {
    console.error('Error deleting app:', error);
    return {
      success: false,
      error: error.message,
      data: null
    };
  }
};

