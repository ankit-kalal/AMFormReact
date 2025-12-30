/**
 * Static Dropdown Component
 * Displays API data in a dropdown menu format without navigation
 */

import { useEffect, useState } from "react";
import { useAuth } from "context/AuthContext";
import { API_BASE_URL, getAuthHeaders, handleResponse } from "api/config";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CircularProgress from "@mui/material/CircularProgress";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavItem from "examples/Sidenav/SidenavItem";
import SidenavList from "examples/Sidenav/SidenavList";

function StaticDropdown({ apiEndpoint, name, icon, color = "info", open, onClick, active }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { session } = useAuth();

  useEffect(() => {
    if (open && apiEndpoint && session) {
      fetchData();
    }
  }, [open, apiEndpoint, session]);

  const fetchData = async () => {
    if (!apiEndpoint || !session) return;

    try {
      setLoading(true);
      setError(null);
      const headers = await getAuthHeaders(session);
      const response = await fetch(`${API_BASE_URL}${apiEndpoint}`, {
        method: "GET",
        headers: headers,
      });

      const result = await handleResponse(response);
      
      // Handle array or object response
      const dataArray = Array.isArray(result) ? result : (result.data || []);
      setData(dataArray);
    } catch (err) {
      console.error("Error fetching dropdown data:", err);
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const renderDropdownItems = () => {
    if (loading) {
      return (
        <SidenavList>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}
          >
            <CircularProgress size={20} />
            <MDTypography variant="caption" sx={{ ml: 1 }}>
              Loading...
            </MDTypography>
          </MDBox>
        </SidenavList>
      );
    }

    if (error) {
      return (
        <SidenavList>
          <MDBox
            sx={{
              padding: 2,
              color: "error.main",
            }}
          >
            <MDTypography variant="caption">Error: {error}</MDTypography>
          </MDBox>
        </SidenavList>
      );
    }

    if (!data || data.length === 0) {
      return (
        <SidenavList>
          <MDBox
            sx={{
              padding: 2,
            }}
          >
            <MDTypography variant="caption" color="text">
              No data available
            </MDTypography>
          </MDBox>
        </SidenavList>
      );
    }

    return data.map((item, index) => {
      // Extract display name from common field names
      const displayName =
        item.name ||
        item.app_name ||
        item.form_name ||
        item.title ||
        item.label ||
        `Item ${index + 1}`;

      return (
        <SidenavList key={item.id || item.key || index}>
          <SidenavItem
            color={color}
            name={displayName}
            active={false}
            nested={true}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle item click - can be extended for custom actions
              console.log("Item clicked:", item);
            }}
          />
        </SidenavList>
      );
    });
  };

  return (
    <SidenavCollapse
      name={name}
      icon={icon}
      active={active}
      open={open}
      onClick={onClick}
      children={open ? renderDropdownItems() : null}
    />
  );
}

export default StaticDropdown;

