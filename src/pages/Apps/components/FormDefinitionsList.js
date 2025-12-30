import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { useMaterialUIController } from "context";

/**
 * FormDefinitionsList Component
 * Displays a list of form definitions in read-only mode
 */
function FormDefinitionsList({ formDefinitions }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

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
        <Card
          key={form.id || form.guid}
          sx={{
            mb: 1.5,
            p: 1.5,
            backgroundColor: "background.paper",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "none",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              boxShadow: 1,
              transform: "translateY(-1px)",
            },
          }}
        >
          <MDBox
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MDTypography variant="body2" fontWeight="medium" color="text">
              {form.name || "Unnamed Form"}
            </MDTypography>
            <MDBox
              sx={{
                px: 1,
                py: 0.5,
                borderRadius: 1,
                backgroundColor: form.is_active 
                  ? "success.lighter" 
                  : "grey.200",
              }}
            >
              <MDTypography
                variant="caption"
                color={form.is_active ? "success.main" : "text.secondary"}
                fontWeight="medium"
              >
                {form.is_active ? "Active" : "Inactive"}
              </MDTypography>
            </MDBox>
          </MDBox>
        </Card>
      ))}
    </MDBox>
  );
}

export default FormDefinitionsList;

