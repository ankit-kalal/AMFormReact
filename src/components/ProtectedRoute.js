import { Navigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import MDBox from "components/MDBox";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        Loading...
      </MDBox>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/authentication/sign-in/basic" replace />;
  }

  return children;
}

export default ProtectedRoute;

