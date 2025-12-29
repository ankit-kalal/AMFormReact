import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

/**
 * FormDefinitionsList Component
 * Displays a list of form definitions in read-only mode
 */
function FormDefinitionsList({ formDefinitions }) {
  if (!formDefinitions || formDefinitions.length === 0) {
    return (
      <MDBox
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px",
        }}
      >
        <MDTypography variant="body2" color="text">
          No form definitions assigned to this app.
        </MDTypography>
      </MDBox>
    );
  }

  return (
    <MDBox>
      {formDefinitions.map((form) => (
        <MDBox
          key={form.id || form.guid}
          sx={{
            mb: 2,
            p: 2,
            backgroundColor: "grey.100",
            borderRadius: 1,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MDTypography variant="body1" fontWeight="medium">
            {form.name || "Unnamed Form"}
          </MDTypography>
          <MDTypography
            variant="caption"
            color={form.is_active ? "success" : "text"}
            sx={{ fontWeight: "medium" }}
          >
            {form.is_active ? "Active" : "Inactive"}
          </MDTypography>
        </MDBox>
      ))}
    </MDBox>
  );
}

export default FormDefinitionsList;

