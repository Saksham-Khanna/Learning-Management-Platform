import React, { useEffect, useState } from 'react';


const ManageQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], answer: '' }
  ]);

  // Fetch quizzes from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/quiz')
      .then(res => res.json())
      .then(data => setQuizzes(data))
      .catch(err => console.error('Error fetching quizzes:', err));
  }, []);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]);
  };

  const createQuiz = async () => {
    const payload = { title, topic, description, questions };
    const res = await fetch('http://localhost:5000/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert('✅ Quiz created successfully!');
      const data = await res.json();
      setQuizzes([...quizzes, data.quiz]);
      setTitle('');
      setTopic('');
      setDescription('');
      setQuestions([{ question: '', options: ['', '', '', ''], answer: '' }]);
    } else {
      alert('❌ Failed to create quiz.');
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #eef2f3, #dfe9f3)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '40px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '25px 40px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          width: '850px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '5px' }}>Manage Quizzes 🧠</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
          Create, view, and manage quizzes easily.
        </p>

        {/* Create Quiz Section */}
        <div
          style={{
            background: '#f8f9fb',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '25px',
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.05)'
          }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Create New Quiz</h3>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ padding: '8px', width: '40%', borderRadius: '6px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              placeholder="Topic"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              style={{ padding: '8px', width: '40%', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>

          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="3"
            style={{
              width: '90%',
              display: 'block',
              margin: '15px auto',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          />

          {questions.map((q, qi) => (
            <div
              key={qi}
              style={{
                background: '#fff',
                borderRadius: '8px',
                padding: '15px',
                margin: '15px auto',
                width: '90%',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}
            >
              <input
                type="text"
                placeholder="Question"
                value={q.question}
                onChange={e => {
                  const updated = [...questions];
                  updated[qi].question = e.target.value;
                  setQuestions(updated);
                }}
                style={{
                  width: '100%',
                  marginBottom: '8px',
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #ddd'
                }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {q.options.map((opt, oi) => (
                  <input
                    key={oi}
                    type="text"
                    placeholder={`Option ${oi + 1}`}
                    value={opt}
                    onChange={e => {
                      const updated = [...questions];
                      updated[qi].options[oi] = e.target.value;
                      setQuestions(updated);
                    }}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #ddd'
                    }}
                  />
                ))}
              </div>

              <input
                type="text"
                placeholder="Correct Answer"
                value={q.answer}
                onChange={e => {
                  const updated = [...questions];
                  updated[qi].answer = e.target.value;
                  setQuestions(updated);
                }}
                style={{
                  width: '100%',
                  marginTop: '8px',
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button
              onClick={addQuestion}
              style={{
                background: '#007bff',
                color: '#fff',
                padding: '8px 16px',
                margin: '5px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              ➕ Add Question
            </button>
            <button
              onClick={createQuiz}
              style={{
                background: '#28a745',
                color: '#fff',
                padding: '8px 16px',
                margin: '5px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              ✅ Create Quiz
            </button>
          </div>
        </div>

        {/* Existing Quizzes */}
        <div>
          <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Existing Quizzes</h3>
          {quizzes.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>No quizzes found.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {quizzes.map((q, i) => (
                <li
                  key={i}
                  style={{
                    background: '#f8f9fa',
                    margin: '8px auto',
                    padding: '12px',
                    borderRadius: '8px',
                    width: '85%',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                    textAlign: 'left'
                  }}
                >
                  <h4 style={{ margin: '0 0 4px 0' }}>{q.title}</h4>
                  <p style={{ margin: '2px 0' }}><strong>Topic:</strong> {q.topic}</p>
                  <p style={{ margin: '2px 0' }}><strong>Description:</strong> {q.description || 'N/A'}</p>
                  <p style={{ margin: '2px 0' }}><strong>Questions:</strong> {q.questions?.length || 0}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageQuiz;
