import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchUsers = async () => {
      if (session) {
        try {
          setLoading(true);
          const result = await getUsers(session);
          console.log("📊 Users API Response:", result);
          console.log("📋 Users Data:", result.data);
          
          if (result.success && result.data) {
            setUsersData(result.data);
          }
        } catch (error) {
          console.error("❌ Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      } else {
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
          <MDTypography variant="h5" fontWeight="medium">
            Users
          </MDTypography>
          <MDTypography variant="button" color="text">
            Manage system users and their permissions
          </MDTypography>
        </MDBox>
        <MDBox sx={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
          <MDBox
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              border: "1px solid #e5e5e5",
              boxShadow: "0 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)",
              height: "100%",
              overflow: "hidden",
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

