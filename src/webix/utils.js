/**
 * Webix Utility Functions
 * Helper functions for working with Webix components
 */

/**
 * Get Webix grid instance by ID
 * @param {string} gridId - The ID of the Webix grid
 * @returns {object|null} Webix grid instance or null if not found
 */
export const getWebixGrid = (gridId) => {
  if (typeof window === 'undefined' || typeof window.webix === 'undefined') {
    console.warn('Webix is not loaded');
    return null;
  }
  return window.webix.$$(gridId);
};

/**
 * Refresh Webix grid data
 * @param {string} gridId - The ID of the Webix grid
 * @param {Array} data - New data to load
 */
export const refreshWebixGrid = (gridId, data) => {
  const grid = getWebixGrid(gridId);
  if (grid) {
    if (grid.clearAll && grid.parse) {
      grid.clearAll();
      grid.parse(data);
    } else if (grid.data) {
      grid.data.clearAll();
      grid.data.parse(data);
    }
  }
};

/**
 * Resize Webix component
 * @param {string} componentId - The ID of the Webix component
 */
export const resizeWebixComponent = (componentId) => {
  const component = getWebixGrid(componentId);
  if (component && component.resize) {
    component.resize();
  }
};

/**
 * Get selected row data from Webix grid
 * @param {string} gridId - The ID of the Webix grid
 * @returns {object|null} Selected row data or null
 */
export const getSelectedRow = (gridId) => {
  const grid = getWebixGrid(gridId);
  if (grid && grid.getSelectedId) {
    const selectedId = grid.getSelectedId();
    if (selectedId) {
      return grid.getItem(selectedId);
    }
  }
  return null;
};

/**
 * Select row in Webix grid by ID
 * @param {string} gridId - The ID of the Webix grid
 * @param {string|number} rowId - The ID of the row to select
 */
export const selectRow = (gridId, rowId) => {
  const grid = getWebixGrid(gridId);
  if (grid && grid.select) {
    grid.select(rowId);
  }
};

/**
 * Check if Webix is loaded
 * @returns {boolean} True if Webix is available
 */
export const isWebixLoaded = () => {
  return typeof window !== 'undefined' && typeof window.webix !== 'undefined';
};

/**
 * Wait for Webix to be loaded
 * @param {number} timeout - Maximum time to wait in milliseconds
 * @returns {Promise} Promise that resolves when Webix is loaded
 */
export const waitForWebix = (timeout = 5000) => {
  return new Promise((resolve, reject) => {
    if (isWebixLoaded()) {
      resolve();
      return;
    }

    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (isWebixLoaded()) {
        clearInterval(checkInterval);
        resolve();
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        reject(new Error('Webix failed to load within timeout'));
      }
    }, 100);
  });
};

/**
 * Format date for Webix display
 * @param {Date|string|number} date - Date to format
 * @param {string} format - Date format string
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'MM/DD/YYYY') => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();

  return format
    .replace('MM', month)
    .replace('DD', day)
    .replace('YYYY', year);
};

/**
 * Get Webix column configuration helper
 * @param {string} id - Column ID
 * @param {string} header - Column header text
 * @param {number} width - Column width
 * @param {object} options - Additional column options
 * @returns {object} Webix column configuration
 */
export const createColumn = (id, header, width, options = {}) => {
  return {
    id,
    header,
    width,
    ...options,
  };
};

/**
 * Create action button column configuration
 * @param {string} action - Action type (view, edit, delete)
 * @param {string} label - Button label
 * @param {number} width - Column width
 * @param {string} styleClass - CSS class for styling
 * @returns {object} Webix column configuration for action button
 */
export const createActionColumn = (action, label, width = 85, styleClass = 'webix-action-btn-style3h') => {
  return {
    id: `${action}_action`,
    header: label,
    width,
    sort: false,
    template: function(obj, common) {
      const rowId = obj.id || obj.$id || common.$id || '';
      return `<button class="${styleClass} ${action}btn" data-action="${action}" data-row-id="${rowId}">${label}</button>`;
    }
  };
};

