import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Dummy data for form definitions
const formDefinitionData = {
  columns: [
    { Header: "Form Name", accessor: "formName", width: "25%" },
    { Header: "Type", accessor: "type", width: "15%" },
    { Header: "Status", accessor: "status", width: "15%" },
    { Header: "Created Date", accessor: "createdDate", width: "20%" },
    { Header: "Last Modified", accessor: "lastModified", width: "20%" },
    { Header: "Actions", accessor: "actions", width: "5%" },
  ],
  rows: [
    {
      formName: "Customer Feedback Form",
      type: "Survey",
      status: "Active",
      createdDate: "2024-01-15",
      lastModified: "2024-12-20",
      actions: "View",
    },
    {
      formName: "Employee Onboarding",
      type: "Registration",
      status: "Active",
      createdDate: "2024-02-10",
      lastModified: "2024-12-18",
      actions: "View",
    },
    {
      formName: "Product Order Form",
      type: "Order",
      status: "Draft",
      createdDate: "2024-11-05",
      lastModified: "2024-12-15",
      actions: "View",
    },
    {
      formName: "Event Registration",
      type: "Registration",
      status: "Active",
      createdDate: "2024-03-20",
      lastModified: "2024-12-10",
      actions: "View",
    },
    {
      formName: "Support Ticket Form",
      type: "Support",
      status: "Active",
      createdDate: "2024-01-08",
      lastModified: "2024-12-05",
      actions: "View",
    },
    {
      formName: "Application Form",
      type: "Application",
      status: "Archived",
      createdDate: "2023-12-01",
      lastModified: "2024-11-28",
      actions: "View",
    },
  ],
};

function FormDefinition() {
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
          <DataTable table={formDefinitionData} canSearch />
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default FormDefinition;

