import React from 'react';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Instructor' };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const buttonStyle = (bg) => ({
    backgroundColor: bg,
    color: '#fff',
    border: 'none',
    padding: '12px 18px',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.3s',
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #f8f9fa, #dde1e7)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
          width: '90%',
          maxWidth: '600px',
        }}
      >
        <h2>Welcome, {user.name} 👋</h2>
        <p>Manage your quizzes and learners here:</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '30px' }}>
          <button onClick={() => navigate('/instructor/manage')} style={buttonStyle('#007bff')}>
            🧩 Manage Quizzes
          </button>

          <button onClick={() => navigate('/instructor/preview')} style={buttonStyle('#17a2b8')}>
            👀 Preview Quizzes
          </button>

          <button onClick={() => navigate('/learner/history')} style={buttonStyle('#28a745')}>
            📊 View Learner Results
          </button>

          <button onClick={() => navigate('/dashboard')} style={buttonStyle('#ffc107')}>
            🏠 Back to Dashboard
          </button>

          <button onClick={handleLogout} style={buttonStyle('#dc3545')}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
