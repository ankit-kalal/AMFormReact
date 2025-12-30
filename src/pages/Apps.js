import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Components
import AppForm from "./Apps/components/AppForm";
import AppsTable from "./Apps/components/AppsTable";

// Hooks
import { useApps, useAppForm, fetchAppDetails } from "./Apps/hooks/useApps";
import { useAppSelector } from "store/hooks";

// Utils
import { confirmDelete } from "./Apps/components/DeleteConfirmDialog";
import { createApp, updateApp, deleteApp } from "store/slices/appsSlice";

function Apps() {
  // Custom hooks
  const { appsData, loading, loadingAppDetails, creating, updating, error, session, dispatch } = useApps();
  const { selectedOrganization } = useAppSelector((state) => state.organizations);
  const {
    isFormOpen,
    editingAppId,
    viewMode,
    formDefinitions,
    formData,
    setEditingAppId,
    setViewMode,
    setFormDefinitions,
    setFormData,
    openForm,
    closeForm,
    switchToEdit,
  } = useAppForm();

  // Handlers
  const handleAction = async (action, rowData) => {
    const appName = rowData.app_name || rowData.name || "App";
    const appId = rowData.id;

    if (action === "view" || action === "edit") {
      openForm(action, appId);

      await fetchAppDetails(
        dispatch,
        session,
        appId,
        rowData,
        {
          onSuccess: (data, definitions) => {
            setFormData(data);
            setFormDefinitions(definitions);
          },
          onError: (error, fallbackData) => {
            console.error("Error fetching app details:", error);
            setFormData({
              app_name: fallbackData.app_name || "",
              description: fallbackData.description || "",
              version: fallbackData.version || "1.0.0",
              status_value: fallbackData.status_value || fallbackData.status || "active",
            });
            setFormDefinitions([]);
          },
        }
      );
    } else if (action === "delete") {
      confirmDelete(appName, async () => {
        try {
          await dispatch(deleteApp({ session, appId })).unwrap();
        } catch (error) {
          console.error("Error deleting app:", error);
          alert(`Failed to delete app: ${error}`);
        }
      });
    }
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleStatusChange = (event) => {
    setFormData({
      ...formData,
      status_value: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (viewMode) return;
    if (!formData.app_name.trim()) {
      alert("App name is required");
      return;
    }

    if (!selectedOrganization?.id) {
      alert("Please select an organization first");
      return;
    }

    try {
      const appData = {
        app_name: formData.app_name,
        description: formData.description,
        version: formData.version,
        status_value: formData.status_value,
      };

      if (editingAppId) {
        await dispatch(updateApp({ session, appId: editingAppId, appData })).unwrap();
      } else {
        await dispatch(createApp({ session, organizationId: selectedOrganization.id, appData })).unwrap();
      }
      closeForm();
    } catch (error) {
      console.error("Error saving app:", error);
      alert(`Failed to ${editingAppId ? "update" : "create"} app: ${error}`);
    }
  };

  const handleSwitchToEdit = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    switchToEdit();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        sx={{
          height: "calc(100vh - 120px)",
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Main Content Area - Shrinks when form is open */}
        <MDBox
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            transition: "margin-right 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            marginRight: isFormOpen ? { xs: 0, sm: "70%" } : 0,
            transform: isFormOpen ? { xs: "scale(1)", sm: "scale(0.99)" } : "scale(1)",
            opacity: isFormOpen ? 0.6 : 1,
            pointerEvents: isFormOpen ? "none" : "auto",
            willChange: "margin-right, transform, opacity",
            overflow: "hidden",
            minWidth: 0,
            position: "relative",
          }}
        >
          <MDBox 
            mb={2} 
            sx={{ 
              flexShrink: 0,
              backgroundColor: "background.paper",
              padding: 0.5,
              borderRadius: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 0.5,
            }}
          >
            <MDTypography variant="button" color="text">
              Manage applications and integrations
            </MDTypography>
            <MDButton 
              variant="contained" 
              color="white" 
              size="small" 
              onClick={() => {
                if (!selectedOrganization?.id) {
                  alert("Please select an organization first");
                  return;
                }
                openForm("create");
              }}
              disabled={isFormOpen || !selectedOrganization?.id}
            >
              <Icon>add</Icon>&nbsp; Add New
            </MDButton>
          </MDBox>

          <MDBox sx={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
            {!selectedOrganization?.id ? (
              <MDBox
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "background.paper",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 3,
                }}
              >
                <MDTypography variant="h6" color="text">
                  Please select an organization to view apps
                </MDTypography>
              </MDBox>
            ) : (
              <MDBox
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "background.paper",
                }}
              >
                <AppsTable
                  loading={loading}
                  error={error}
                  appsData={appsData}
                  onAction={handleAction}
                  disabled={isFormOpen}
                />
              </MDBox>
            )}
          </MDBox>
        </MDBox>

        {/* Form Sidebar */}
        <AppForm
          isOpen={isFormOpen}
          viewMode={viewMode}
          editingAppId={editingAppId}
          loadingAppDetails={loadingAppDetails}
          formData={formData}
          formDefinitions={formDefinitions}
          creating={creating}
          updating={updating}
          onClose={closeForm}
          onInputChange={handleInputChange}
          onStatusChange={handleStatusChange}
          onSubmit={handleSubmit}
          onSwitchToEdit={handleSwitchToEdit}
        />
      </MDBox>
    </DashboardLayout>
  );
}

export default Apps;
