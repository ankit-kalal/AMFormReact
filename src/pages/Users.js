import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Users
            </MDTypography>
            <MDTypography variant="button" color="text">
              Manage system users and their permissions
            </MDTypography>
          </MDBox>
          <MDBox p={3} sx={{ height: "600px" }}>
            {loading ? (
              <MDBox display="flex" justifyContent="center" alignItems="center" height="100%">
                <MDTypography>Loading users...</MDTypography>
              </MDBox>
            ) : (
              <WebixDataTable
                config={getUsersGridConfig()}
                data={usersData}
                containerId="users-webix-container"
              />
            )}
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;

