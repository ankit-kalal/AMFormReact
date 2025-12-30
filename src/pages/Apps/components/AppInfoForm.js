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
        p: viewMode ? 2 : 3,
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid",
        borderColor: "divider",
        minHeight: 0,
        overflowY: "auto",
      }}
    >
      <MDTypography variant="h6" fontWeight="medium" mb={viewMode ? 1.5 : 2}>
        App Information
      </MDTypography>

      {viewMode ? (
        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="regular" mb={0.5}>
            App Name <span style={{ color: "#d32f2f" }}>*</span>
          </MDTypography>
          <MDBox
            sx={{
              px: 1.5,
              py: 0.75,
              backgroundColor: "grey.50",
              borderRadius: 1,
              border: "none",
            }}
          >
            <MDTypography variant="body2" color="text" fontWeight="medium">
              {formData.app_name || "—"}
            </MDTypography>
          </MDBox>
        </MDBox>
      ) : (
        <MDBox mb={3}>
          <MDInput
            label="App Name"
            variant="standard"
            fullWidth
            value={formData.app_name}
            onChange={onInputChange("app_name")}
            required
          />
        </MDBox>
      )}

      <MDBox mb={viewMode ? 2 : 3}>
        <MDTypography variant="caption" color="text" fontWeight="regular" mb={0.5}>
          Organization
        </MDTypography>
        <MDBox
          sx={{
            px: 1.5,
            py: viewMode ? 0.75 : 1,
            backgroundColor: "grey.50",
            borderRadius: 1,
            border: "none",
          }}
        >
          <MDTypography variant="body2" color="text" fontWeight="medium">
            {selectedOrganization?.name || "N/A"}
          </MDTypography>
        </MDBox>
      </MDBox>

      {viewMode ? (
        <>
          <MDBox mb={2}>
            <MDTypography variant="caption" color="text" fontWeight="regular" mb={0.5}>
              Description
            </MDTypography>
            <MDBox
              sx={{
                px: 1.5,
                py: 0.75,
                backgroundColor: "grey.50",
                borderRadius: 1,
                border: "none",
                minHeight: "40px",
              }}
            >
              <MDTypography variant="body2" color="text" fontWeight="regular">
                {formData.description || "—"}
              </MDTypography>
            </MDBox>
          </MDBox>

          <MDBox mb={2}>
            <MDTypography variant="caption" color="text" fontWeight="regular" mb={0.5}>
              Version
            </MDTypography>
            <MDBox
              sx={{
                px: 1.5,
                py: 0.75,
                backgroundColor: "grey.50",
                borderRadius: 1,
                border: "none",
              }}
            >
              <MDTypography variant="body2" color="text" fontWeight="medium">
                {formData.version || "—"}
              </MDTypography>
            </MDBox>
          </MDBox>

          <MDBox mb={2}>
            <MDTypography variant="caption" color="text" fontWeight="regular" mb={0.5}>
              Status
            </MDTypography>
            <MDBox
              sx={{
                px: 1.5,
                py: 0.75,
                backgroundColor: "grey.50",
                borderRadius: 1,
                border: "none",
              }}
            >
              <MDTypography variant="body2" color="text" fontWeight="medium">
                {formData.status_value === "active" ? "Active" : formData.status_value === "inactive" ? "Inactive" : "—"}
              </MDTypography>
            </MDBox>
          </MDBox>
        </>
      ) : (
        <>
          <MDBox mb={3}>
            <MDInput
              label="Description"
              variant="standard"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={onInputChange("description")}
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
            />
          </MDBox>

          <MDBox mb={4}>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status_value}
                onChange={onStatusChange}
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </MDBox>
        </>
      )}

      <MDBox
        sx={{
          mt: "auto",
          pt: viewMode ? 2 : 3,
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

