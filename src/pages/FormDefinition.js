import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import WebixDataTable from "components/WebixDataTable";

// Auth Context
import { useAuth } from "context/AuthContext";

// API Service
import { getForms } from "api/services/formsService";

// Webix Grid Config
import { getFormsGridConfig } from "webix/formsGrid";

function FormDefinition() {
  const { session } = useAuth();
  const [formsData, setFormsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      if (session) {
        try {
          setLoading(true);
          const result = await getForms(session);
          console.log("📊 Forms API Response:", result);
          console.log("📋 Forms Data:", result.data);
          
          if (result.success && result.data) {
            setFormsData(result.data);
          }
        } catch (error) {
          console.error("❌ Error fetching forms:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("⚠️ No session available for API call");
        setLoading(false);
      }
    };

    fetchForms();
  }, [session]);

  const handleAction = (action, rowData) => {
    const formName = rowData.name || 'Form';
    const formId = rowData.id || 'N/A';
    
    console.log(`Action: ${action}`, rowData);
    
    if (action === 'view') {
      alert(`View action clicked for form: ${formName} (ID: ${formId})`);
    } else if (action === 'edit') {
      alert(`Edit action clicked for form: ${formName} (ID: ${formId})`);
    } else if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete form: ${formName}?`)) {
        alert(`Delete action clicked for form: ${formName} (ID: ${formId})`);
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
            Form Definitions
          </MDTypography>
          <MDTypography variant="button" color="text">
            Manage and configure form definitions
          </MDTypography>
        </MDBox>
        <MDBox sx={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
          {loading ? (
            <MDBox display="flex" justifyContent="center" alignItems="center" height="100%">
              <MDTypography>Loading forms...</MDTypography>
            </MDBox>
          ) : (
             <WebixDataTable
               config={getFormsGridConfig()}
               data={formsData}
               containerId="forms-webix-container"
               onAction={handleAction}
             />
          )}
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default FormDefinition;

