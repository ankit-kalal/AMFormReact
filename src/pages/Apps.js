import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
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

  const handleAction = (action, rowData) => {
    const appName = rowData.app_name || rowData.name || 'App';
    const appId = rowData.id || 'N/A';
    
    console.log(`Action: ${action}`, rowData);
    
    if (action === 'view') {
      alert(`View action clicked for app: ${appName} (ID: ${appId})`);
    } else if (action === 'edit') {
      alert(`Edit action clicked for app: ${appName} (ID: ${appId})`);
    } else if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete app: ${appName}?`)) {
        alert(`Delete action clicked for app: ${appName} (ID: ${appId})`);
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
            Apps
          </MDTypography>
          <MDTypography variant="button" color="text">
            Manage applications and integrations
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
                <MDTypography>Loading apps...</MDTypography>
              </MDBox>
            ) : (
              <WebixDataTable
                config={getAppsGridConfig()}
                data={appsData}
                containerId="apps-webix-container"
                onAction={handleAction}
              />
            )}
          </MDBox>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Apps;

