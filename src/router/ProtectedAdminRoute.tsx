import useAuthentication from "../hooks/useAuthentication.ts";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedAdminRoute = () => {
  const authentication = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authentication?.isAuthenticated) {
      navigate("/");
    }

    if (!authentication?.roles.includes("Admin")) {
      navigate("/");
    }
  }, [authentication, navigate]);

  return <Outlet />;
};

export default ProtectedAdminRoute;
