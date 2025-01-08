// App Component
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/HomePage';
import ChooseUser from './pages/ChooseUser';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import StudentLogin from './pages/studentrelated/StudentLogin';
import FacultyLogin from './pages/facultyrelated/facultylogin';
import AdminDashboard from './projectAdmin/src/components/MainContent.tsx';
import DashboardView from './projectStudent/src/components/DashboardView.tsx';
import FacultyDashboard from './projectFaculty/src/views/DashboardView.tsx';

function App() {
    const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [isFacultyLoggedIn, setIsFacultyLoggedIn] = useState(false);

    // Check authentication state from localStorage
    useEffect(() => {
        const studentAuth = localStorage.getItem('studentAuthToken');
        const adminAuth = localStorage.getItem('adminAuthToken');
        const facultyAuth = localStorage.getItem('facultyAuthToken');

        if (studentAuth) setIsStudentLoggedIn(true);
        if (adminAuth) setIsAdminLoggedIn(true);
        if (facultyAuth) setIsFacultyLoggedIn(true);
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.clear();
        setIsStudentLoggedIn(false);
        setIsAdminLoggedIn(false);
        setIsFacultyLoggedIn(false);
    };

    // ProtectedRoute component
    const ProtectedRoute = ({ element, isAuthenticated, redirectTo }) => {
        return isAuthenticated ? element : <Navigate to={redirectTo} />;
    };

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/choose" element={<ChooseUser visitor="guest" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/student-login" element={<StudentLogin />} />
                <Route path="/faculty-login" element={<FacultyLogin />} />

                {/* Student Protected Route */}
                <Route
                    path="/dashboard-view"
                    element={
                        <ProtectedRoute
                            element={<DashboardView />}
                            isAuthenticated={isStudentLoggedIn}
                            redirectTo="/student-login"
                        />
                    }
                />

                {/* Faculty Protected Route */}
                <Route
                    path="/faculty-dashboard-view"
                    element={
                        <ProtectedRoute
                            element={<FacultyDashboard />}
                            isAuthenticated={isFacultyLoggedIn}
                            redirectTo="/faculty-login"
                        />
                    }
                />

                {/* Admin Protected Route */}
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute
                            element={<AdminDashboard onLogout={handleLogout} />}
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
