// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/" />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
