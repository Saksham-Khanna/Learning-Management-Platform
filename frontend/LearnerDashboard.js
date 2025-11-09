import React from 'react';
import { useNavigate } from 'react-router-dom';

const LearnerDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Learner' };

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
        background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
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
        <p>What would you like to do today?</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '30px' }}>
          <button onClick={() => navigate('/quiz/start')} style={buttonStyle('#007bff')}>
            🧠 Start Quiz
          </button>

          <button onClick={() => navigate('/quiz/custom')} style={buttonStyle('#28a745')}>
            ⚙️ Take Custom Quiz
          </button>

          <button onClick={() => navigate('/quiz/result')} style={buttonStyle('#17a2b8')}>
            📊 View Results
          </button>

          <button onClick={() => navigate('/learner/history')} style={buttonStyle('#ffc107')}>
            🕒 View Quiz History
          </button>

          <button onClick={handleLogout} style={buttonStyle('#dc3545')}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;
