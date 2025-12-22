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
import { getFormApps } from "api/services/appsService";

// Webix Grid Config
import { getAppsGridConfig } from "webix/appsGrid";

function Apps() {
  const { session } = useAuth();
  const [appsData, setAppsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      if (session) {
        try {
          setLoading(true);
          const result = await getFormApps(session);
          console.log("📊 Apps API Response:", result);
          console.log("📋 Apps Data:", result.data);
          
          if (result.success && result.data) {
            setAppsData(result.data);
          }
        } catch (error) {
          console.error("❌ Error fetching apps:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("⚠️ No session available for API call");
        setLoading(false);
      }
    };

    fetchApps();
  }, [session]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Apps
            </MDTypography>
            <MDTypography variant="button" color="text">
              Manage applications and integrations
            </MDTypography>
          </MDBox>
          <MDBox p={3} sx={{ height: "600px" }}>
            {loading ? (
              <MDBox display="flex" justifyContent="center" alignItems="center" height="100%">
                <MDTypography>Loading apps...</MDTypography>
              </MDBox>
            ) : (
              <WebixDataTable
                config={getAppsGridConfig()}
                data={appsData}
                containerId="apps-webix-container"
              />
            )}
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Apps;

