import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import WebixDataTable from "components/WebixDataTable";
import { getAppsGridConfig } from "webix/appsGrid";

/**
 * AppsTable Component
 * Displays the apps data table with loading and error states
 */
function AppsTable({ loading, error, appsData, onAction, disabled }) {
  if (loading) {
    return (
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <MDTypography>Loading apps...</MDTypography>
      </MDBox>
    );
  }

  if (error) {
    return (
      <MDBox
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        p={3}
      >
        <MDTypography variant="h6" color="error" mb={1}>
          Error loading apps
        </MDTypography>
        <MDTypography variant="body2" color="text">
          {error}
        </MDTypography>
      </MDBox>
    );
  }

  return (
    <MDBox
      sx={{
        height: "100%",
        width: "100%",
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      <WebixDataTable
        config={getAppsGridConfig()}
        data={appsData}
        containerId="apps-webix-container"
        onAction={disabled ? undefined : onAction}
      />
    </MDBox>
  );
}

export default AppsTable;

