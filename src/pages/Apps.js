import { useEffect, useState, useRef } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import WebixDataTable from "components/WebixDataTable";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";

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
  const hasFetchedRef = useRef(false);
  const lastAccessTokenRef = useRef(null);

  useEffect(() => {
    const fetchApps = async () => {
      // Only fetch if:
      // 1. Session exists
      // 2. Either we haven't fetched yet OR the access token has changed
      const currentAccessToken = session?.access_token;
      const shouldFetch =
        session &&
        (!hasFetchedRef.current ||
          currentAccessToken !== lastAccessTokenRef.current);

      if (shouldFetch) {
        try {
          setLoading(true);
          const result = await getFormApps(session);
          console.log("📊 Apps API Response:", result);
          console.log("📋 Apps Data:", result.data);

          if (result.success && result.data) {
            setAppsData(result.data);
            hasFetchedRef.current = true;
            lastAccessTokenRef.current = currentAccessToken;
          }
        } catch (error) {
          console.error("❌ Error fetching apps:", error);
        } finally {
          setLoading(false);
        }
      } else if (!session) {
        console.warn("⚠️ No session available for API call");
        setLoading(false);
      }
    };

    fetchApps();
  }, [session]);

  const handleAction = (action, rowData) => {
    const appName = rowData.app_name || rowData.name || "App";
    const appId = rowData.id || "N/A";

    console.log(`Action: ${action}`, rowData);

    if (action === "view") {
      alert(`View action clicked for app: ${appName} (ID: ${appId})`);
    } else if (action === "edit") {
      alert(`Edit action clicked for app: ${appName} (ID: ${appId})`);
    } else if (action === "delete") {
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
        <MDBox 
          mb={2} 
          sx={{ 
            flexShrink: 0,
            backgroundColor: "white !important",
            padding: 0.5,
            borderRadius: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 0.5,
          }}
        >
          <MDTypography variant="button" color="text">
            Manage applications and integrations
          </MDTypography>
          <MDButton variant="contained" color="white" size="small" onClick={() => alert("Add new app")}>
            <Icon>add</Icon>&nbsp; Add New
          </MDButton>
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
              <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
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
