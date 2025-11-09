import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🚫 If user not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 If user role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ All good, render the route
  return children;
};

export default ProtectedRoute;
