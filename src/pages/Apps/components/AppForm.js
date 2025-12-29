import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import AppInfoForm from "./AppInfoForm";
import FormDefinitionsList from "./FormDefinitionsList";

/**
 * AppForm Component
 * Main form sidebar component for viewing/editing apps
 */
function AppForm({
  isOpen,
  viewMode,
  editingAppId,
  loadingAppDetails,
  formData,
  formDefinitions,
  creating,
  updating,
  onClose,
  onInputChange,
  onStatusChange,
  onSubmit,
  onSwitchToEdit,
}) {
  if (!isOpen) return null;

  const getTitle = () => {
    if (viewMode) return "View App";
    if (editingAppId) return "Edit App";
    return "Add New App";
  };

  return (
    <MDBox
      sx={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: { xs: "100%", sm: "70%" },
        backgroundColor: "white",
        borderLeft: "1px solid",
        borderColor: "divider",
        transition: "width 0.3s ease-in-out",
        overflow: "hidden",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        boxShadow: "-2px 0 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <MDBox
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MDTypography variant="h5" fontWeight="medium">
          {getTitle()}
        </MDTypography>
        <MDButton
          variant="text"
          color="dark"
          iconOnly
          circular
          onClick={onClose}
          sx={{ minWidth: "auto", padding: 1 }}
        >
          <Icon>close</Icon>
        </MDButton>
      </MDBox>

      {/* Form Content */}
      <MDBox
        component="form"
        onSubmit={onSubmit}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        {loadingAppDetails ? (
          <MDBox
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <MDTypography>Loading app details...</MDTypography>
          </MDBox>
        ) : (
          <>
            {/* Left Side - App Information */}
            <AppInfoForm
              formData={formData}
              viewMode={viewMode}
              creating={creating}
              updating={updating}
              editingAppId={editingAppId}
              onInputChange={onInputChange}
              onStatusChange={onStatusChange}
              onSubmit={onSubmit}
              onEdit={onSwitchToEdit}
              onCancel={onClose}
            />

            {/* Right Side - Form Definitions */}
            <MDBox
              sx={{
                flex: 1,
                p: 3,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <MDTypography variant="h6" fontWeight="medium" mb={2}>
                Form Definitions
              </MDTypography>
              <FormDefinitionsList formDefinitions={formDefinitions} />
            </MDBox>
          </>
        )}
      </MDBox>
    </MDBox>
  );
}

export default AppForm;

