import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AdminProtected({ children }) {
  const { activeUser } = useAuth();
  if (!activeUser.is_admin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default AdminProtected;
