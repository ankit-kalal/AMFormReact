import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import MDBox from "components/MDBox";

function Logout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await signOut();
      navigate("/authentication/sign-in/basic");
    };

    handleLogout();
  }, [signOut, navigate]);

  return (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      Signing out...
    </MDBox>
  );
}

export default Logout;

