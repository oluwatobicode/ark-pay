import type { JSX } from "react";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoutes = ({ children }: ProtectedRouteProps) => {
  return children;
};

export default ProtectedRoutes;
