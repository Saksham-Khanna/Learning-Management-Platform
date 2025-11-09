import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.email) return;

        console.log("📡 Fetching history once for:", user.email);
        const response = await fetch(`http://localhost:5000/api/history/${user.email}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          console.warn("⚠️ Unexpected history format:", data);
          setHistory([]);
        }
      } catch (error) {
        console.error("❌ Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []); // ✅ empty dependency array → runs only once

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Loading history...</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '40px', fontFamily: 'Poppins, sans-serif' }}>
      <h2>📜 Quiz History</h2>

      {history.length === 0 ? (
        <p>No quiz history available.</p>
      ) : (
        <table
          style={{
            margin: '20px auto',
            borderCollapse: 'collapse',
            width: '80%',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <thead style={{ backgroundColor: '#007bff', color: '#fff' }}>
            <tr>
              <th style={{ padding: '10px' }}>Quiz Title</th>
              <th style={{ padding: '10px' }}>Score</th>
              <th style={{ padding: '10px' }}>Total</th>
              <th style={{ padding: '10px' }}>Percentage</th>
              <th style={{ padding: '10px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, index) => (
              <tr key={index} style={{ background: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td style={{ padding: '10px' }}>{h.quizTitle}</td>
                <td style={{ padding: '10px' }}>{h.score}</td>
                <td style={{ padding: '10px' }}>{h.total}</td>
                <td style={{ padding: '10px' }}>{h.percentage}%</td>
                <td style={{ padding: '10px' }}>
                  {new Date(h.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={() => navigate('/learner')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        🔙 Back to Dashboard
      </button>
    </div>
  );
};

export default QuizHistory;
