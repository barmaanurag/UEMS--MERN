import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/HomePage';
import ChooseUser from './pages/ChooseUser';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import StudentLogin from './pages/studentrelated/StudentLogin';
import StudentDashboard from './pages/studentrelated/StudentDashboard';
import AdminDashboard from './pages/adminrelated/AdminDashboard';

function App() {
  const isStudentLoggedIn = false; // Replace with actual logic
  const isAdminLoggedIn = false; // Replace with actual logic

  const ProtectedRoute = ({ element, isAuthenticated, redirectTo }) => {
    return isAuthenticated ? element : <Navigate to={redirectTo} />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/choose" element={<ChooseUser visitor="guest" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute
              element={<StudentDashboard />}
              isAuthenticated={isStudentLoggedIn}
              redirectTo="/login"
            />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              isAuthenticated={isAdminLoggedIn}
              redirectTo="/login"
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
