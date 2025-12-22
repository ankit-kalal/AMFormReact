import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dummy apps data
const apps = [
  {
    name: "CRM Integration",
    description: "Customer relationship management system",
    status: "Active",
    icon: "people",
    color: "info",
  },
  {
    name: "Email Service",
    description: "Email marketing and notifications",
    status: "Active",
    icon: "email",
    color: "success",
  },
  {
    name: "Payment Gateway",
    description: "Process payments and transactions",
    status: "Active",
    icon: "payment",
    color: "warning",
  },
  {
    name: "Analytics Dashboard",
    description: "Data analytics and reporting",
    status: "Active",
    icon: "analytics",
    color: "primary",
  },
  {
    name: "Storage Service",
    description: "File storage and management",
    status: "Active",
    icon: "storage",
    color: "dark",
  },
  {
    name: "API Gateway",
    description: "API management and routing",
    status: "Inactive",
    icon: "api",
    color: "secondary",
  },
];

function Apps() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <MDTypography variant="h5" fontWeight="medium">
            Apps
          </MDTypography>
          <MDTypography variant="button" color="text">
            Manage applications and integrations
          </MDTypography>
        </MDBox>
        <Grid container spacing={3}>
          {apps.map((app, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <MDBox p={3}>
                  <MDBox display="flex" alignItems="center" mb={2}>
                    <MDBox
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      width="3rem"
                      height="3rem"
                      borderRadius="md"
                      bgColor={app.color}
                      color="white"
                      mr={2}
                    >
                      <Icon fontSize="medium">{app.icon}</Icon>
                    </MDBox>
                    <MDBox>
                      <MDTypography variant="h6" fontWeight="medium">
                        {app.name}
                      </MDTypography>
                      <MDBadge
                        badgeContent={app.status}
                        color={app.status === "Active" ? "success" : "error"}
                        variant="gradient"
                        size="sm"
                      />
                    </MDBox>
                  </MDBox>
                  <MDTypography variant="body2" color="text">
                    {app.description}
                  </MDTypography>
                </MDBox>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Apps;

