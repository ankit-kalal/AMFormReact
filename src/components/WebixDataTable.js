import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * Webix DataTable React Wrapper Component
 * Handles Webix lifecycle: initialize on mount, update data, destroy on unmount
 */
function WebixDataTable({ config, data, containerId, onAction }) {
  const containerRef = useRef(null);
  const webixInstanceRef = useRef(null);

  useEffect(() => {
    // Ensure Webix is available
    if (typeof window.webix === "undefined") {
      console.error("❌ WebixDataTable: Webix library is not loaded");
      return;
    }

    let clickHandler = null;
    let clickCleanup = null;

    // Initialize Webix only once
    if (!webixInstanceRef.current && containerRef.current) {
      const webixConfig = {
        ...config,
        container: containerRef.current,
        data: data || [] // Initialize with data if available, or empty array
      };

      webixInstanceRef.current = window.webix.ui(webixConfig);

      // Set up click handler for action buttons
      if (onAction && webixInstanceRef.current) {
        const grid = webixInstanceRef.current;
        
        // Use event delegation on the container to catch all button clicks
        clickHandler = function(e) {
          const target = e.target || e.srcElement;
          
          // Check if clicked element is a button with data-action attribute
          let actionElement = null;
          
          // First, check if the target itself is a button with data-action
          if (target && target.tagName === "BUTTON" && target.hasAttribute && target.hasAttribute("data-action")) {
            actionElement = target;
          } 
          // Otherwise, check if we clicked inside a button (e.g., clicked on text inside button)
          else if (target && target.closest) {
            actionElement = target.closest('button[data-action]');
          }
          
          if (actionElement) {
            const action = actionElement.getAttribute("data-action");
            const rowId = actionElement.getAttribute("data-row-id");
            
            if (action) {
              // Try to get row data using rowId from data attribute
              let rowData = null;
              
              // Method 1: Try to find by data id field
              if (rowId) {
                try {
                  // First try using getItem with the rowId directly
                  rowData = grid.getItem(rowId);
                  
                  // If not found, try searching in serialized data
                  if (!rowData && grid.data) {
                    const allData = grid.data.serialize();
                    rowData = allData.find(item => {
                      return String(item.id) === String(rowId) || 
                             String(item.$id) === String(rowId);
                    });
                  }
                } catch (err) {
                  console.error("WebixDataTable: Error finding row data:", err);
                }
              }
              
              // Method 2: Try to find by traversing DOM to get Webix row ID
              if (!rowData) {
                let currentElement = actionElement;
                let webixRowId = null;
                
                // Traverse up to find the Webix row
                while (currentElement && !webixRowId) {
                  if (currentElement.getAttribute) {
                    const webixId = currentElement.getAttribute('webix_id') || 
                                   currentElement.getAttribute('webix_r_id') ||
                                   currentElement.getAttribute('id');
                    if (webixId) {
                      // Try to extract row ID from Webix ID format (usually gridId_rowId)
                      const parts = webixId.split('_');
                      if (parts.length > 1) {
                        webixRowId = parts[parts.length - 1];
                      } else {
                        webixRowId = webixId;
                      }
                      break;
                    }
                  }
                  currentElement = currentElement.parentElement;
                  if (!currentElement || currentElement === containerRef.current) break;
                }
                
                if (webixRowId) {
                  try {
                    rowData = grid.getItem(webixRowId);
                  } catch (err) {
                    console.error("WebixDataTable: Error getting item by webix_id:", err);
                  }
                }
              }
              
              // Method 3: Try to find by cell ID
              if (!rowData) {
                try {
                  const cellElement = actionElement.closest('[webix_c_id]') || actionElement.closest('td');
                  if (cellElement) {
                    const cellId = cellElement.getAttribute('webix_c_id');
                    if (cellId) {
                      const parts = cellId.split('_');
                      if (parts.length > 0) {
                        const potentialRowId = parts[parts.length - 1];
                        rowData = grid.getItem(potentialRowId);
                      }
                    }
                  }
                } catch (err) {
                  console.error("WebixDataTable: Error in cell ID lookup:", err);
                }
              }
              
              if (rowData) {
                try {
                  onAction(action, rowData);
                } catch (err) {
                  console.error("WebixDataTable: Error calling onAction:", err);
                }
                e.stopPropagation();
                e.preventDefault();
                return false;
              } else {
                console.error("WebixDataTable: Could not find row data for action:", action, "rowId:", rowId);
              }
            }
          }
        };
        
        // Attach click handler to the grid container
        if (containerRef.current) {
          containerRef.current.addEventListener('click', clickHandler, true); // Use capture phase
          
          clickCleanup = () => {
            if (containerRef.current && clickHandler) {
              containerRef.current.removeEventListener('click', clickHandler, true);
            }
          };
        }
        
        // Also use Webix's onItemClick as primary handler (more reliable)
        const onItemClickHandler = function(id, e, node) {
          const target = e.target || e.srcElement || (e.originalEvent && e.originalEvent.target);
          
          if (target) {
            // Check if target is a button or inside a button
            let buttonElement = null;
            if (target.tagName === "BUTTON" && target.hasAttribute && target.hasAttribute("data-action")) {
              buttonElement = target;
            } else if (target.closest) {
              buttonElement = target.closest('button[data-action]');
            }
            
            if (buttonElement) {
              const action = buttonElement.getAttribute("data-action");
              
              try {
                const rowData = grid.getItem(id);
                if (rowData && onAction) {
                  onAction(action, rowData);
                  e.stopPropagation();
                  return false;
                }
              } catch (err) {
                console.error("WebixDataTable: Error in onItemClick:", err);
              }
            }
          }
        };
        
        grid.attachEvent("onItemClick", onItemClickHandler);
      }
    }

    // Cleanup on unmount
    return () => {
      if (clickCleanup) {
        clickCleanup();
      }
      if (webixInstanceRef.current) {
        webixInstanceRef.current.destructor();
        webixInstanceRef.current = null;
      }
    };
  }, [config, containerId, onAction]);

  // Update data when it changes
  useEffect(() => {
    if (webixInstanceRef.current && data) {
      const grid = webixInstanceRef.current;
      if (grid.clearAll && grid.parse) {
        grid.clearAll();
        grid.parse(data);
      } else if (grid.data) {
        grid.data.clearAll();
        grid.data.parse(data);
      }
    }
  }, [data]);

  // Handle resize to ensure grid fills container width
  useEffect(() => {
    if (!webixInstanceRef.current || !containerRef.current) {
      return;
    }

    const resizeHandler = () => {
      if (webixInstanceRef.current) {
        // Force Webix to recalculate size
        webixInstanceRef.current.resize();
      }
    };

    // Initial resize after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(resizeHandler, 100);

    // Listen for window resize
    window.addEventListener('resize', resizeHandler);

    // Use ResizeObserver for container size changes
    let resizeObserver = null;
    if (containerRef.current.parentElement) {
      resizeObserver = new ResizeObserver(resizeHandler);
      resizeObserver.observe(containerRef.current.parentElement);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', resizeHandler);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [data]); // Re-run when data changes to ensure proper sizing

  return (
    <div
      ref={containerRef}
      id={containerId}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "400px",
        display: "block",
        position: "relative",
      }}
    />
  );
}

WebixDataTable.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.array,
  containerId: PropTypes.string.isRequired,
  onAction: PropTypes.func,
};

export default WebixDataTable;

