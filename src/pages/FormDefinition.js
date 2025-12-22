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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Form Definitions
            </MDTypography>
            <MDTypography variant="button" color="text">
              Manage and configure form definitions
            </MDTypography>
          </MDBox>
          <MDBox p={3} sx={{ height: "600px" }}>
            {loading ? (
              <MDBox display="flex" justifyContent="center" alignItems="center" height="100%">
                <MDTypography>Loading forms...</MDTypography>
              </MDBox>
            ) : (
              <WebixDataTable
                config={getFormsGridConfig()}
                data={formsData}
                containerId="forms-webix-container"
              />
            )}
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default FormDefinition;

