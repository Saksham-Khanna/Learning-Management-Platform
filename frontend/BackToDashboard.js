import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const goBack = () => {
    if (user?.role === 'learner') navigate('/learner');
    else if (user?.role === 'instructor') navigate('/instructor');
    else navigate('/dashboard');
  };

  return (
    <div style={{ position: 'absolute', top: 20, left: 20 }}>
      <button
        onClick={goBack}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        ⬅ Back to Dashboard
      </button>
    </div>
  );
};

export default BackToDashboard;
