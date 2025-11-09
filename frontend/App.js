import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// ----------------------------------------------------------------
// FIX: Ensure all page components are correctly imported 
// ----------------------------------------------------------------
import LearnerDashboard from './pages/LearnerDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import QuizStart from './pages/QuizStart';
import QuizResult from './pages/QuizResult';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import ProtectedRoute from './ProtectedRoute';
import PreviewQuiz from './pages/PreviewQuiz';
import CustomQuizStart from './pages/CustomQuizStart';
import QuizHistory from './pages/QuizHistory';
import ManageQuiz from './pages/ManageQuiz';
import WelcomePage from './pages/WelcomePage'; // Keep this import
import DashboardPage from './pages/DashboardPage';
import './App.css'; 
// ----------------------------------------------------------------

// Utility component for centered messages

// Optional: Unauthorized page
const Unauthorized = () => (
    <div className="centered-page"> 
        <div style={{ textAlign: 'center', padding: '30px', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
            <h2>🚫 Access Denied</h2>
            <p>You do not have permission to view this page.</p>
            <Link to="/login" style={{ display: 'block', marginTop: '15px' }}>Go to Login</Link>
        </div>
    </div>
);

// Optional: 404 Page
const NotFound = () => (
    <div className="centered-page">
        <div style={{ textAlign: 'center', padding: '30px', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" style={{ display: 'block', marginTop: '15px' }}>Go Home</Link>
        </div>
    </div>
);

function App() {
    return (
        <Router>
            <Routes>
                {/* ✅ Public Routes */}
                <Route path="/" element={<WelcomePage />} /> {/* 🌟 FIX: Use WelcomePage on root path */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* Dashboard Page - Assumed to be protected later */}
                <Route path="/dashboard" element={<DashboardPage />} />
                
                {/* ✅ Learner Routes */}
                <Route
                    path="/learner"
                    element={
                        <ProtectedRoute allowedRoles={['learner']}>
                            <LearnerDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/quiz/start"
                    element={
                        <ProtectedRoute allowedRoles={['learner']}>
                            <QuizStart />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/quiz/result"
                    element={
                        <ProtectedRoute allowedRoles={['learner']}>
                            <QuizResult />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/quiz/custom"
                    element={
                        <ProtectedRoute allowedRoles={['learner']}>
                            <CustomQuizStart />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/learner/history"
                    element={
                        <ProtectedRoute allowedRoles={['learner']}>
                            <QuizHistory />
                        </ProtectedRoute>
                    }
                />

                {/* ✅ Instructor Routes */}
                <Route
                    path="/instructor"
                    element={
                        <ProtectedRoute allowedRoles={['instructor']}>
                            <InstructorDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/instructor/preview"
                    element={
                        <ProtectedRoute allowedRoles={['instructor']}>
                            <PreviewQuiz />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/instructor/manage"
                    element={
                        <ProtectedRoute allowedRoles={['instructor']}>
                            <ManageQuiz />
                        </ProtectedRoute>
                    }
                />
                {/* ✅ Fallback Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;