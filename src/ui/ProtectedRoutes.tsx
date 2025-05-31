import type React from "react";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state, checkAuthStatus } = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (state.isLoading) {
    return <div>Loading</div>;
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
