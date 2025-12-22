import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Dummy data for groups
const groupsData = {
  columns: [
    { Header: "Group Name", accessor: "groupName", width: "25%" },
    { Header: "Description", accessor: "description", width: "35%" },
    { Header: "Members", accessor: "members", width: "15%" },
    { Header: "Status", accessor: "status", width: "15%" },
    { Header: "Created Date", accessor: "createdDate", width: "10%" },
  ],
  rows: [
    {
      groupName: "Administrators",
      description: "Full system access and management",
      members: 3,
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      groupName: "Managers",
      description: "Department managers with elevated permissions",
      members: 8,
      status: "Active",
      createdDate: "2024-01-05",
    },
    {
      groupName: "Developers",
      description: "Development team members",
      members: 15,
      status: "Active",
      createdDate: "2024-01-10",
    },
    {
      groupName: "Support Team",
      description: "Customer support representatives",
      members: 12,
      status: "Active",
      createdDate: "2024-02-01",
    },
    {
      groupName: "Sales Team",
      description: "Sales and marketing personnel",
      members: 10,
      status: "Active",
      createdDate: "2024-02-15",
    },
    {
      groupName: "Guests",
      description: "Limited access users",
      members: 25,
      status: "Active",
      createdDate: "2024-03-01",
    },
    {
      groupName: "Archived Users",
      description: "Inactive user group",
      members: 5,
      status: "Inactive",
      createdDate: "2023-12-01",
    },
  ],
};

function Groups() {
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
          <DataTable table={groupsData} canSearch />
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Groups;

