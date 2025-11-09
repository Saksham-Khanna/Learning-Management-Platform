import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'User', role: 'guest' };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #cfd9df, #e2ebf0)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '50px 40px',
          borderRadius: '16px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
          width: '90%',
          maxWidth: '600px',
        }}
      >
        <h2 style={{ fontSize: '28px', fontWeight: '600' }}>
          Welcome to Your Dashboard 🎓
        </h2>
        <p style={{ color: '#555', fontSize: '16px', marginTop: '10px' }}>
          This is your personalized learning area. You can track progress, manage quizzes, 
          and explore new topics here.
        </p>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
          {user.role === 'learner' && (
            <button
              onClick={() => navigate('/learner')}
              style={buttonStyle('#007bff')}
            >
              Go to Learner Dashboard
            </button>
          )}
          {user.role === 'instructor' && (
            <button
              onClick={() => navigate('/instructor')}
              style={buttonStyle('#28a745')}
            >
              Go to Instructor Dashboard
            </button>
          )}
          <button onClick={() => navigate('/login')} style={buttonStyle('#dc3545')}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = (bg) => ({
  backgroundColor: bg,
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '15px',
  transition: '0.3s',
});

export default DashboardPage;
