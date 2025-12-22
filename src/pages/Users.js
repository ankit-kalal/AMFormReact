import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Dummy data for users
const usersData = {
  columns: [
    { Header: "Name", accessor: "name", width: "25%" },
    { Header: "Email", accessor: "email", width: "30%" },
    { Header: "Role", accessor: "role", width: "15%" },
    { Header: "Status", accessor: "status", width: "15%" },
    { Header: "Last Login", accessor: "lastLogin", width: "15%" },
  ],
  rows: [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-12-22",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2024-12-21",
    },
    {
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2024-12-20",
    },
    {
      name: "Alice Williams",
      email: "alice.williams@example.com",
      role: "Manager",
      status: "Active",
      lastLogin: "2024-12-19",
    },
    {
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2024-11-15",
    },
    {
      name: "Diana Prince",
      email: "diana.prince@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-12-22",
    },
    {
      name: "Edward Norton",
      email: "edward.norton@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2024-12-18",
    },
    {
      name: "Fiona Apple",
      email: "fiona.apple@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2024-12-17",
    },
  ],
};

function Users() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Users
            </MDTypography>
            <MDTypography variant="button" color="text">
              Manage system users and their permissions
            </MDTypography>
          </MDBox>
          <DataTable table={usersData} canSearch />
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;

