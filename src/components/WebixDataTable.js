import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * Webix DataTable React Wrapper Component
 * Handles Webix lifecycle: initialize on mount, update data, destroy on unmount
 */
function WebixDataTable({ config, data, containerId }) {
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
    }

    // Cleanup on unmount
    return () => {
      if (webixInstanceRef.current) {
        webixInstanceRef.current.destructor();
        webixInstanceRef.current = null;
      }
    };
  }, [config, containerId]);

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

  return <div ref={containerRef} id={containerId} style={{ width: "100%", height: "100%" }} />;
}

WebixDataTable.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.array,
  containerId: PropTypes.string.isRequired,
};

export default WebixDataTable;

