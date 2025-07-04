import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChooseRole from './pages/ChooseRole';
import EmployeeAuth from './pages/auth/EmployeeAuth';
import RecruiterAuth from './pages/auth/RecruiterAuth';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import EditRecruiter from './pages/recruiter/EditRecruiter';

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
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <EmployeeDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/recruiter/dashboard"
        element={
          <PrivateRoute allowedRoles={['recruiter']}>
            <RecruiterDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/recruiter/edit-profile"
        element={
          <PrivateRoute allowedRoles={['recruiter']}>
            <EditRecruiter />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
