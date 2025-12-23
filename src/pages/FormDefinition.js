import { useEffect, useState, useRef } from "react";
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
  const hasFetchedRef = useRef(false);
  const lastAccessTokenRef = useRef(null);

  useEffect(() => {
    const fetchForms = async () => {
      // Only fetch if:
      // 1. Session exists
      // 2. Either we haven't fetched yet OR the access token has changed
      const currentAccessToken = session?.access_token;
      const shouldFetch = session && 
        (!hasFetchedRef.current || currentAccessToken !== lastAccessTokenRef.current);

      if (shouldFetch) {
        try {
          setLoading(true);
          const result = await getForms(session);
          console.log("📊 Forms API Response:", result);
          console.log("📋 Forms Data:", result.data);
          
          if (result.success && result.data) {
            setFormsData(result.data);
            hasFetchedRef.current = true;
            lastAccessTokenRef.current = currentAccessToken;
          }
        } catch (error) {
          console.error("❌ Error fetching forms:", error);
        } finally {
          setLoading(false);
        }
      } else if (!session) {
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
      </MDBox>
    </DashboardLayout>
  );
}

export default FormDefinition;

