import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
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

  const handleAction = (action, rowData) => {
    const groupName = rowData.name || 'Group';
    const groupId = rowData.id || 'N/A';
    
    console.log(`Action: ${action}`, rowData);
    
    if (action === 'view') {
      alert(`View action clicked for group: ${groupName} (ID: ${groupId})`);
    } else if (action === 'edit') {
      alert(`Edit action clicked for group: ${groupName} (ID: ${groupId})`);
    } else if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete group: ${groupName}?`)) {
        alert(`Delete action clicked for group: ${groupName} (ID: ${groupId})`);
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
            Groups
          </MDTypography>
          <MDTypography variant="button" color="text">
            Manage user groups and their permissions
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
                <MDTypography>Loading groups...</MDTypography>
              </MDBox>
            ) : (
              <WebixDataTable
                config={getGroupsGridConfig()}
                data={groupsData}
                containerId="groups-webix-container"
                onAction={handleAction}
              />
            )}
          </MDBox>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Groups;

