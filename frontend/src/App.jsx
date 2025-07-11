import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ChooseRole from "./pages/ChooseRole";
import EmployeeAuth from "./pages/auth/EmployeeAuth";
import RecruiterAuth from "./pages/auth/RecruiterAuth";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import EditRecruiter from "./pages/recruiter/EditRecruiter";
import EditEmployee from "./pages/employee/EditEmployee";
import AddJob from "./pages/recruiter/AddJob";
import ViewPostedJobs from "./pages/recruiter/ViewPostedJobs";
import EditJob from "./pages/recruiter/EditJob";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <ChooseRole />
          </PublicRoute>
        }
      />
      <Route
        path="/auth-employee"
        element={
          <PublicRoute>
            <EmployeeAuth />
          </PublicRoute>
        }
      />
      <Route
        path="/auth-recruiter"
        element={
          <PublicRoute>
            <RecruiterAuth />
          </PublicRoute>
        }
      />

      {/* Private routes */}
      <Route
        path="/employee/dashboard/:id"
        element={<Navigate to="/employee/dashboard" replace />}
      />

      <Route
        path="/employee/dashboard"
        element={
          <PrivateRoute allowedRoles={["employee"]}>
            <EmployeeDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/employee/edit-profile"
        element={
          <PrivateRoute allowedRoles={["employee"]}>
            <EditEmployee />
          </PrivateRoute>
        }
      />

      {/* 🔁 Redirect old dashboard with ID to new one */}
      <Route
        path="/recruiter/dashboard/:id"
        element={<Navigate to="/recruiter/dashboard" replace />}
      />

      <Route
        path="/recruiter/dashboard"
        element={
          <PrivateRoute allowedRoles={["recruiter"]}>
            <RecruiterDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/recruiter/edit-profile"
        element={
          <PrivateRoute allowedRoles={["recruiter"]}>
            <EditRecruiter />
          </PrivateRoute>
        }
      />
      <Route
        path="/recruiter/post-job"
        element={
          <PrivateRoute allowedRoles={["recruiter"]}>
            <AddJob />
          </PrivateRoute>
        }
      />
      <Route
        path="/recruiter/view-jobs"
        element={
          <PrivateRoute allowedRoles={["recruiter"]}>
            <ViewPostedJobs />
          </PrivateRoute>
        }
      />
      <Route
        path="/recruiter/edit-job/:id"
        element={
          <PrivateRoute allowedRoles={["recruiter"]}>
            <EditJob />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
