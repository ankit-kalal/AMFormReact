import { useEffect, useState, useRef } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import WebixDataTable from "components/WebixDataTable";

// Auth Context
import { useAuth } from "context/AuthContext";

// API Service
import { getUsers } from "api/services/usersService";

// Webix Grid Config
import { getUsersGridConfig } from "webix/usersGrid";

function Users() {
  const { session } = useAuth();
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);
  const lastAccessTokenRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      // Only fetch if:
      // 1. Session exists
      // 2. Either we haven't fetched yet OR the access token has changed
      const currentAccessToken = session?.access_token;
      const shouldFetch = session && 
        (!hasFetchedRef.current || currentAccessToken !== lastAccessTokenRef.current);

      if (shouldFetch) {
        try {
          setLoading(true);
          const result = await getUsers(session);
          console.log("📊 Users API Response:", result);
          console.log("📋 Users Data:", result.data);
          
          if (result.success && result.data) {
            setUsersData(result.data);
            hasFetchedRef.current = true;
            lastAccessTokenRef.current = currentAccessToken;
          }
        } catch (error) {
          console.error("❌ Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      } else if (!session) {
        console.warn("⚠️ No session available for API call");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [session]);

  const handleAction = (action, rowData) => {
    const userName = rowData.name || rowData.email || 'User';
    const userId = rowData.id || rowData.user_id || 'N/A';
    
    console.log(`Action: ${action}`, rowData);
    
    if (action === 'view') {
      alert(`View action clicked for user: ${userName} (ID: ${userId})`);
    } else if (action === 'edit') {
      alert(`Edit action clicked for user: ${userName} (ID: ${userId})`);
    } else if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete user: ${userName}?`)) {
        alert(`Delete action clicked for user: ${userName} (ID: ${userId})`);
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        sx={{
          height: "calc(100vh - 120px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <MDBox mb={2} sx={{ flexShrink: 0 }}>
          
          <MDTypography variant="button" color="text">
            Manage system users and their permissions
          </MDTypography>
        </MDBox>
        <MDBox sx={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
          <MDBox
            sx={{
              height: "100%",
              width: "100%",
              backgroundColor: "white !important",
            }}
          >
            {loading ? (
              <MDBox display="flex" justifyContent="center" alignItems="center" height="100%">
                <MDTypography>Loading users...</MDTypography>
              </MDBox>
            ) : (
              <WebixDataTable
                config={getUsersGridConfig()}
                data={usersData}
                containerId="users-webix-container"
                onAction={handleAction}
              />
            )}
          </MDBox>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Users;

