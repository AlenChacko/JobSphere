// src/routes/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { token, role, user } = useSelector((state) => state.auth);

  if (token && role === "employee") {
    return <Navigate to={`/employee/dashboard/${user?._id}`} />;
  }

  if (token && role === "recruiter") {
    return <Navigate to={`/recruiter/dashboard/${user?._id}`} />;
  }

  return children;
};

export default PublicRoute;
