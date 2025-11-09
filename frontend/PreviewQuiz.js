import React, { useEffect, useState } from 'react';
import BackToDashboard from '../components/BackToDashboard';

const PreviewQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/quiz')
      .then(res => res.json())
      .then(data => setQuizzes(data))
      .catch(err => console.error('❌ Error fetching quizzes:', err));
  }, []);

  const handleSelectQuiz = async (quizId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/quiz/${quizId}`);
      const data = await res.json();
      setSelectedQuiz(data);
    } catch (err) {
      console.error('❌ Error fetching quiz details:', err);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Poppins, sans-serif' }}>
      <BackToDashboard />
      <h2>📋 Quiz Preview</h2>

      {!selectedQuiz ? (
        <>
          <h4>Available Quizzes:</h4>
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div
                key={quiz._id}
                onClick={() => handleSelectQuiz(quiz._id)}
                style={{
                  border: '1px solid #ccc',
                  padding: '15px',
                  marginBottom: '10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <strong>{quiz.title}</strong>
                <p>{quiz.description || 'No description provided.'}</p>
              </div>
            ))
          ) : (
            <p>No quizzes available yet.</p>
          )}
        </>
      ) : (
        <div>
          <h3>{selectedQuiz.title}</h3>
          <p><strong>Topic:</strong> {selectedQuiz.topic}</p>
          <ul>
            {selectedQuiz.questions.map((q, i) => (
              <li key={i}>
                <strong>Q{i + 1}:</strong> {q.question}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setSelectedQuiz(null)}
            style={{
              marginTop: '15px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Back to List
          </button>
        </div>
      )}
    </div>
  );
};

export default PreviewQuiz;
