/**
 * API Configuration
 * Centralized configuration for API base URL and authentication
 */

/**
 * Get the API base URL based on environment
 * @returns {string} API base URL
 */
export const getApiUrl = () => {
  return `https://am-form-back-end-giantkillerrobo.replit.app/api`
  
  
  const hostname = window.location.hostname;
  
  // Development environment
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0') {
    return 'http://0.0.0.0:8000/api';
  }

  return `https://am-form-back-end-giantkillerrobo.replit.app/api`
  
  // Production environment - use same domain with /api path
  return `${window.location.protocol}//${window.location.host}/api`;
};

export const API_BASE_URL = getApiUrl();

/**
 * Get authentication headers for API requests
 * @param {Object} session - Supabase session object
 * @returns {Promise<Object>} Headers object with authorization
 */
export const getAuthHeaders = async (session) => {
  try {
    if (!session?.access_token) {
      throw new Error('No access token available in session');
    }

    return {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
      'accept': 'application/json'
    };
  } catch (error) {
    console.error('❌ Error getting access token:', error);
    console.warn('⚠️  Making API call WITHOUT authentication - this will likely fail');
    return {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    };
  }
};

/**
 * Handle API response and extract JSON data
 * @param {Response} response - Fetch response object
 * @returns {Promise<Object>} Parsed JSON data
 * @throws {Error} If response is not ok
 */
export const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `HTTP error! status: ${response.status}`;
    
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      errorMessage = errorText || errorMessage;
    }
    
    throw new Error(errorMessage);
  }
  
  return await response.json();
};

/**
 * Format date to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  });
};

