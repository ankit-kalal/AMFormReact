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
import { getGroups } from "api/services/groupsService";

// Webix Grid Config
import { getGroupsGridConfig } from "webix/groupsGrid";

function Groups() {
  const { session } = useAuth();
  const [groupsData, setGroupsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      if (session) {
        try {
          setLoading(true);
          const result = await getGroups(session);
          console.log("📊 Groups API Response:", result);
          console.log("📋 Groups Data:", result.data);
          
          if (result.success && result.data) {
            setGroupsData(result.data);
          }
        } catch (error) {
          console.error("❌ Error fetching groups:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("⚠️ No session available for API call");
        setLoading(false);
      }
    };

    fetchGroups();
  }, [session]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Groups
            </MDTypography>
            <MDTypography variant="button" color="text">
              Manage user groups and their permissions
            </MDTypography>
          </MDBox>
          <MDBox p={3} sx={{ height: "600px" }}>
            {loading ? (
              <MDBox display="flex" justifyContent="center" alignItems="center" height="100%">
                <MDTypography>Loading groups...</MDTypography>
              </MDBox>
            ) : (
              <WebixDataTable
                config={getGroupsGridConfig()}
                data={groupsData}
                containerId="groups-webix-container"
              />
            )}
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Groups;

