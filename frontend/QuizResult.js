import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const QuizResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score = 0, total = 0, topic = 'General Quiz' } = location.state || {};

  const percentage = total > 0 ? ((score / total) * 100).toFixed(2) : '0.00';
  const user = JSON.parse(localStorage.getItem('user'));

  // ✅ Save quiz history to backend when quiz finishes
  useEffect(() => {
    if (user && score !== undefined && total !== undefined) {
      fetch('http://localhost:5000/api/history/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          learnerEmail: user.email,
          learnerName: user.name,
          topic: topic || 'General Quiz',
          score,
          total,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log('✅ Quiz history saved:', data))
        .catch((err) => console.error('❌ Error saving history:', err));
    }
  }, [user, score, total, topic]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #f0f4f8, #d9e2ec)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          borderRadius: '10px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <h2>🎯 Quiz Results</h2>
        <p>
          <strong>Score:</strong> {score} / {total}
        </p>
        <p>
          <strong>Percentage:</strong> {percentage}%
        </p>
        <p>
          <strong>Topic:</strong> {topic}
        </p>

        <button
          onClick={() => navigate('/learner/history')}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          View Quiz History 📜
        </button>

        <button
          onClick={() => navigate('/learner')}
          style={{
            marginTop: '10px',
            marginLeft: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Back to Dashboard 🏠
        </button>
      </div>
    </div>
  );
};

export default QuizResultPage;
