import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchApps, fetchAppById, createApp, updateApp, deleteApp } from "store/slices/appsSlice";
import { useAuth } from "context/AuthContext";

/**
 * Custom hook for managing apps state and operations
 */
export function useApps() {
  const dispatch = useAppDispatch();
  const { apps: appsData, loading, loadingAppDetails, creating, updating, deleting, error } = useAppSelector(
    (state) => state.apps
  );
  const { selectedOrganization } = useAppSelector((state) => state.organizations);
  const { session } = useAuth();

  const hasFetchedRef = useRef(false);
  const lastAccessTokenRef = useRef(null);
  const lastOrganizationIdRef = useRef(null);

  // Fetch apps on mount, when session changes, or when organization changes
  useEffect(() => {
    const currentAccessToken = session?.access_token;
    const currentOrganizationId = selectedOrganization?.id;
    
    const shouldFetch =
      session &&
      currentOrganizationId &&
      (
        !hasFetchedRef.current || 
        currentAccessToken !== lastAccessTokenRef.current ||
        currentOrganizationId !== lastOrganizationIdRef.current
      );

    if (shouldFetch) {
      dispatch(fetchApps({ session, organizationId: currentOrganizationId })).then((result) => {
        if (result.type === "apps/fetchApps/fulfilled") {
          hasFetchedRef.current = true;
          lastAccessTokenRef.current = currentAccessToken;
          lastOrganizationIdRef.current = currentOrganizationId;
        }
      });
    }
  }, [session, dispatch, selectedOrganization?.id]);

  return {
    appsData,
    loading,
    loadingAppDetails,
    creating,
    updating,
    deleting,
    error,
    session,
    dispatch,
  };
}

/**
 * Custom hook for managing app form state
 */
export function useAppForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAppId, setEditingAppId] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [formDefinitions, setFormDefinitions] = useState([]);
  const [formData, setFormData] = useState({
    app_name: "",
    description: "",
    version: "",
    status_value: "active",
  });

  const resetForm = () => {
    setFormData({
      app_name: "",
      description: "",
      version: "",
      status_value: "active",
    });
    setFormDefinitions([]);
    setEditingAppId(null);
    setViewMode(false);
  };

  const openForm = (mode = "create", appId = null) => {
    if (mode === "create") {
      resetForm();
    } else {
      // Don't reset form data when viewing/editing - will be set from API
      setFormDefinitions([]);
    }
    setViewMode(mode === "view");
    if (appId) {
      setEditingAppId(appId);
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    resetForm();
  };

  const switchToEdit = () => {
    setViewMode(false);
  };

  return {
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
  };
}

/**
 * Helper function to fetch app details
 */
export async function fetchAppDetails(dispatch, session, appId, rowData, callbacks) {
  const { onSuccess, onError } = callbacks;
  
  try {
    const result = await dispatch(fetchAppById({ session, appId }));
    
    if (result.type === "apps/fetchAppById/fulfilled") {
      const app = result.payload;
      onSuccess({
        app_name: app.app_name || "",
        description: app.description || "",
        version: app.version || "1.0.0",
        status_value: app.status_value || app.status || "active",
      }, app.form_definitions || []);
    } else {
      // Fallback to row data
      onError(result.error, rowData);
    }
  } catch (error) {
    onError(error, rowData);
  }
}

