import React, { useState } from 'react';

const CreateQuiz = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleOptionChange = (value, index) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = async () => {
    const quizData = {
      question,
      options,
      answer: correctIndex,
    };
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/quiz/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(quizData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Quiz created successfully!');
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrectIndex(0);
      } else {
        alert(data.message || 'Failed to create quiz');
      }
    } catch (err) {
      console.error('Quiz creation error:', err);
      alert('Something went wrong.');
    }
  };
  return (
    <div style={{ padding: '40px' }}>
      <h2>Create New Quiz</h2>
      <input
        type="text"
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      /><br /><br />
      {options.map((opt, idx) => (
        <div key={idx}>
          <input
            type="text"
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(e.target.value, idx)}
          />
          <input
            type="radio"
            name="correct"
            checked={correctIndex === idx}
            onChange={() => setCorrectIndex(idx)}
          /> Correct
        </div>
      ))}
      <br />
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default CreateQuiz;



