import { useEffect, useState, useRef } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import WebixDataTable from "components/WebixDataTable";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Icon from "@mui/material/Icon";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

// Redux
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchApps, createApp, updateApp, deleteApp, fetchAppById } from "store/slices/appsSlice";

// Auth Context (temporary - until session is synced to Redux)
import { useAuth } from "context/AuthContext";

// Webix Grid Config
import { getAppsGridConfig } from "webix/appsGrid";

function Apps() {
  // Redux hooks
  const dispatch = useAppDispatch();
  const { apps: appsData, loading, creating, updating, deleting, error } = useAppSelector((state) => state.apps);
  
  // Get session from AuthContext (temporary - until synced to Redux)
  const { session } = useAuth();
  
  const hasFetchedRef = useRef(false);
  const lastAccessTokenRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAppId, setEditingAppId] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [formData, setFormData] = useState({
    app_name: "",
    description: "",
    version: "",
    status_value: "active",
  });

  useEffect(() => {
    // Only fetch if:
    // 1. Session exists
    // 2. Either we haven't fetched yet OR the access token has changed
    const currentAccessToken = session?.access_token;
    const shouldFetch =
      session &&
      (!hasFetchedRef.current ||
        currentAccessToken !== lastAccessTokenRef.current);

    if (shouldFetch) {
      dispatch(fetchApps(session))
        .then((result) => {
          if (result.type === 'apps/fetchApps/fulfilled') {
            hasFetchedRef.current = true;
            lastAccessTokenRef.current = currentAccessToken;
          } else if (result.type === 'apps/fetchApps/rejected') {
            console.error("Error fetching apps:", result.error);
          }
        });
    }
  }, [session, dispatch]);

  const handleAction = async (action, rowData) => {
    const appName = rowData.app_name || rowData.name || "App";
    const appId = rowData.id || "N/A";

    if (action === "view") {
      // View action - open form in read-only mode
      setEditingAppId(appId); // Store app ID for switching to edit mode
      setViewMode(true);
      setFormData({
        app_name: rowData.app_name || "",
        description: rowData.description || "",
        version: rowData.version || "1.0.0",
        status_value: rowData.status_value || rowData.status || "active",
      });
      setIsFormOpen(true);
    } else if (action === "edit") {
      // Edit action - open form with app data in edit mode
      setEditingAppId(appId);
      setViewMode(false);
      setFormData({
        app_name: rowData.app_name || "",
        description: rowData.description || "",
        version: rowData.version || "1.0.0",
        status_value: rowData.status_value || rowData.status || "active",
      });
      setIsFormOpen(true);
    } else if (action === "delete") {
      // Delete action
      if (window.confirm(`Are you sure you want to delete app: ${appName}?`)) {
        try {
          await dispatch(deleteApp({ session, appId })).unwrap();
        } catch (error) {
          console.error("Error deleting app:", error);
          alert(`Failed to delete app: ${error}`);
        }
      }
    }
  };

  const handleOpenForm = () => {
    setEditingAppId(null);
    setViewMode(false);
    setFormData({
      app_name: "",
      description: "",
      version: "",
      status_value: "active",
    });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAppId(null);
    setViewMode(false);
    setFormData({
      app_name: "",
      description: "",
      version: "",
      status_value: "active",
    });
  };

  const handleSwitchToEdit = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setViewMode(false);
    // editingAppId is already set when viewing, so we just need to switch modes
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Prevent submission if in view mode
    if (viewMode) {
      return;
    }
    
    if (!formData.app_name.trim()) {
      alert("App name is required");
      return;
    }

    try {
      if (editingAppId) {
        // Update existing app
        await dispatch(updateApp({
          session,
          appId: editingAppId,
          appData: {
            app_name: formData.app_name,
            description: formData.description,
            version: formData.version,
            status_value: formData.status_value,
          }
        })).unwrap();
      } else {
        // Create new app
        await dispatch(createApp({
          session,
          appData: {
            app_name: formData.app_name,
            description: formData.description,
            version: formData.version,
            status_value: formData.status_value,
          }
        })).unwrap();
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving app:", error);
      alert(`Failed to ${editingAppId ? 'update' : 'create'} app: ${error}`);
    }
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
            transition: "margin-right 0.3s ease-in-out",
            marginRight: isFormOpen ? { xs: 0, sm: "400px" } : 0,
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          <MDBox 
            mb={2} 
            sx={{ 
              flexShrink: 0,
              backgroundColor: "white !important",
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
            <MDButton variant="contained" color="white" size="small" onClick={handleOpenForm}>
              <Icon>add</Icon>&nbsp; Add New
            </MDButton>
          </MDBox>

          <MDBox sx={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
            <MDBox
              sx={{
                height: "100%",
                width: "100%",
                backgroundColor: "white !important",
              }}
            >
              {loading ? (
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <MDTypography>Loading apps...</MDTypography>
                </MDBox>
              ) : error ? (
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
              ) : (
                <>
                  <WebixDataTable
                    config={getAppsGridConfig()}
                    data={appsData}
                    containerId="apps-webix-container"
                    onAction={handleAction}
                  />
                </>
              )}
            </MDBox>
          </MDBox>
        </MDBox>

        {/* Form Sidebar - Part of the screen */}
        <MDBox
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: { xs: "100%", sm: isFormOpen ? "400px" : "0px" },
            backgroundColor: "white",
            borderLeft: isFormOpen ? "1px solid" : "none",
            borderColor: "divider",
            transition: "width 0.3s ease-in-out",
            overflow: "hidden",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            boxShadow: isFormOpen ? "-2px 0 8px rgba(0,0,0,0.1)" : "none",
          }}
        >
          {isFormOpen && (
            <>
              <MDBox
                sx={{
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <MDTypography variant="h5" fontWeight="medium">
                  {viewMode ? "View App" : editingAppId ? "Edit App" : "Add New App"}
                </MDTypography>
                <MDButton
                  variant="text"
                  color="dark"
                  iconOnly
                  circular
                  onClick={handleCloseForm}
                  sx={{ minWidth: "auto", padding: 1 }}
                >
                  <Icon>close</Icon>
                </MDButton>
              </MDBox>
              <MDBox
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  flex: 1,
                  p: 3,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <MDBox mb={3}>
                  <MDInput
                    label="App Name"
                    variant="standard"
                    fullWidth
                    value={formData.app_name}
                    onChange={handleInputChange("app_name")}
                    disabled={viewMode}
                    required
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
                    onChange={handleInputChange("description")}
                    disabled={viewMode}
                  />
                </MDBox>
                <MDBox mb={3}>
                  <MDInput
                    label="Version"
                    variant="standard"
                    fullWidth
                    value={formData.version}
                    onChange={handleInputChange("version")}
                    placeholder="e.g., 1.0.0"
                    disabled={viewMode}
                  />
                </MDBox>
                <MDBox mb={4}>
                  <FormControl variant="standard" fullWidth disabled={viewMode}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status_value}
                      onChange={(e) => setFormData({ ...formData, status_value: e.target.value })}
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
                    <MDButton 
                      variant="text" 
                      color="info" 
                      type="button"
                      onClick={handleSwitchToEdit}
                    >
                      Edit
                    </MDButton>
                  ) : (
                    <MDButton 
                      variant="text" 
                      color="info" 
                      type="submit"
                      disabled={creating || updating}
                    >
                      {creating ? "Creating..." : updating ? "Updating..." : editingAppId ? "Update App" : "Create App"}
                    </MDButton>
                  )}
                  <MDButton variant="text" color="dark" onClick={handleCloseForm}>
                    {viewMode ? "Close" : "Cancel"}
                  </MDButton>
                </MDBox>
              </MDBox>
            </>
          )}
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Apps;
