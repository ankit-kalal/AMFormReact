import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAppSelector } from "store/hooks";

/**
 * AppInfoForm Component
 * Displays and handles app information form fields
 */
function AppInfoForm({
  formData,
  viewMode,
  creating,
  updating,
  editingAppId,
  onInputChange,
  onStatusChange,
  onSubmit,
  onEdit,
  onCancel,
}) {
  const { selectedOrganization } = useAppSelector((state) => state.organizations);
  return (
    <MDBox
      sx={{
        flex: 1,
        p: 3,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <MDTypography variant="h6" fontWeight="medium" mb={2}>
        App Information
      </MDTypography>

      <MDBox mb={3}>
        <MDInput
          label="App Name"
          variant="standard"
          fullWidth
          value={formData.app_name}
          onChange={onInputChange("app_name")}
          disabled={viewMode}
          required
        />
      </MDBox>

      <MDBox mb={3}>
        <MDInput
          label="Organization"
          variant="standard"
          fullWidth
          value={selectedOrganization?.name || "N/A"}
          disabled
        />
      </MDBox>

      <MDBox mb={3}>
        <MDInput
          label="Description"
          variant="standard"
          fullWidth
          multiline
          rows={4}
          value={formData.description}
          onChange={onInputChange("description")}
          disabled={viewMode}
        />
      </MDBox>

      <MDBox mb={3}>
        <MDInput
          label="Version"
          variant="standard"
          fullWidth
          value={formData.version}
          onChange={onInputChange("version")}
          placeholder="e.g., 1.0.0"
          disabled={viewMode}
        />
      </MDBox>

      <MDBox mb={4}>
        <FormControl variant="standard" fullWidth disabled={viewMode}>
          <InputLabel>Status</InputLabel>
          <Select
            value={formData.status_value}
            onChange={onStatusChange}
            label="Status"
            disabled={viewMode}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </MDBox>

      <MDBox
        sx={{
          mt: "auto",
          pt: 3,
          display: "flex",
          gap: 1,
          justifyContent: "space-between",
        }}
      >
        {viewMode ? (
          <MDButton variant="text" color="info" type="button" onClick={onEdit}>
            Edit
          </MDButton>
        ) : (
          <MDButton
            variant="text"
            color="info"
            type="submit"
            disabled={creating || updating}
          >
            {creating
              ? "Creating..."
              : updating
              ? "Updating..."
              : editingAppId
              ? "Update App"
              : "Create App"}
          </MDButton>
        )}
        <MDButton variant="text" color="dark" onClick={onCancel}>
          {viewMode ? "Close" : "Cancel"}
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

export default AppInfoForm;

