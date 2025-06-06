import type React from "react";
import { useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state, checkAuthStatus } = useAuth();
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    // Only check auth status once and only if not already authenticated
    if (!state.isAuthenticated && !state.isLoading && !hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      checkAuthStatus();
    }
  }, [state.isAuthenticated, state.isLoading, checkAuthStatus]);

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
