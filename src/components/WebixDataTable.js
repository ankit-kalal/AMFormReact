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
      console.error("Webix library is not loaded");
      return;
    }

    // Initialize Webix only once
    if (!webixInstanceRef.current && containerRef.current) {
      const webixConfig = {
        ...config,
        container: containerRef.current,
      };

      webixInstanceRef.current = window.webix.ui(webixConfig);

      // Set up click handler for action buttons
      if (onAction && webixInstanceRef.current) {
        const grid = webixInstanceRef.current;
        
        // Use Webix's onItemClick to handle button clicks
        grid.attachEvent("onItemClick", function(id, e, node) {
          const target = e.target || e.srcElement;
          // Check if clicked element is a button/span or inside a button/span
          const actionElement = target.closest && (
            target.closest('button.webix-action-btn-style1') ||
            target.closest('button.webix-action-btn-style2') ||
            target.closest('button.webix-action-btn-style3') ||
            target.closest('button.webix-action-btn-style3a') ||
            target.closest('button.webix-action-btn-style3b') ||
            target.closest('button.webix-action-btn-style3c') ||
            target.closest('button.webix-action-btn-style3d') ||
            target.closest('button.webix-action-btn-style3e') ||
            target.closest('button.webix-action-btn-style3f') ||
            target.closest('button.webix-action-btn-style3g') ||
            target.closest('button.webix-action-btn-style3h') ||
            target.closest('button.webix-action-btn-style3i') ||
            target.closest('span.webix-action-btn-style4')
          ) || (
            (target.tagName === "BUTTON" && target.classList.contains('webix-action-btn-style1')) ||
            (target.tagName === "BUTTON" && target.classList.contains('webix-action-btn-style2')) ||
            (target.tagName === "BUTTON" && target.classList.contains('webix-action-btn-style3')) ||
            (target.tagName === "BUTTON" && target.classList.contains('webix-action-btn-style3a')) ||
            (target.tagName === "BUTTON" && target.classList.contains('webix-action-btn-style3b')) ||
            (target.tagName === "BUTTON" && target.classList.contains('webix-action-btn-style3c')) ||
            (target.tagName === "BUTTON" && target.classList.contains('webix-action-btn-style3d')) ||
            (target.tagName === "BUTTON" && target.classList.contains('webix-action-btn-style3e')) ||
            (target.tagName === "BUTTON" && target.classList.contains('webix-action-btn-style3f')) ||
            (target.tagName === "BUTTON" && target.classList.contains('webix-action-btn-style3g')) ||
            (target.tagName === "BUTTON" && target.classList.contains('webix-action-btn-style3h')) ||
            (target.tagName === "BUTTON" && target.classList.contains('webix-action-btn-style3i')) ||
            (target.tagName === "SPAN" && target.classList.contains('webix-action-btn-style4'))
          );
          
          if (actionElement) {
            const action = actionElement.getAttribute("data-action");
            const rowId = actionElement.getAttribute("data-row-id");
            
            if (action) {
              // Get row data using the row ID from Webix
              const rowData = grid.getItem(id);
              if (rowData) {
                onAction(action, rowData);
                e.stopPropagation();
                return false;
              }
            }
          }
        });
      }
    }

    // Cleanup on unmount
    return () => {
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

  return (
    <div
      ref={containerRef}
      id={containerId}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "400px",
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

