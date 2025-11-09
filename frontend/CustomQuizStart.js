import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const CustomQuizStart = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [matchAnswers, setMatchAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('customQuiz')) || [];
    setQuestions(stored);
  }, []);
  const currentQ = questions[current];

  const nextQuestion = (extraScore = 0) => {
    const finalScore = score + extraScore;
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setUserInput('');
      setMatchAnswers({});
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      const results = JSON.parse(localStorage.getItem('quizResults')) || [];

      const newResult = {
        name: user?.name || 'Anonymous',
        score: finalScore,
        total: questions.length,
        date: new Date().toLocaleString(),
        source: 'custom'
      };
      results.push(newResult);
      localStorage.setItem('quizResults', JSON.stringify(results));

      navigate('/quiz/result', {
        state: { score: finalScore, total: questions.length }
      });
    }
  };
  const handleMCQ = (option) => {
    nextQuestion(option === currentQ.answer ? 1 : 0);
  };

  const handleFill = () => {
    const isCorrect = userInput.trim().toLowerCase() === currentQ.answer.toLowerCase();
    nextQuestion(isCorrect ? 1 : 0);
  };

  const handleShort = () => {
    nextQuestion(0);
  };

  const handleMatchSubmit = () => {
    const correctPairs = currentQ.pairs;
    let matchScore = 0;
    Object.entries(correctPairs).forEach(([left, right]) => {
      if (matchAnswers[left] === right) matchScore += 1;
    });
    nextQuestion(matchScore);
  };
  if (questions.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>No custom quiz found.</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Custom Quiz</h2>
      <p><strong>Question {current + 1} of {questions.length}</strong></p>
      <p>{currentQ.question}</p>

      {currentQ.type === 'mcq' &&
        currentQ.options.map((opt, i) => (
          <button key={i} onClick={() => handleMCQ(opt)} style={{ margin: '5px' }}>
            {opt}
          </button>
        ))}
        {currentQ.type === 'fill' && (
        <>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Your answer"
          />
          <br /><br />
          <button onClick={handleFill}>Submit</button>
        </>
      )}

      {currentQ.type === 'short' && (
        <>
          <textarea
            rows="4"
            cols="50"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your answer here"
          />
          <br /><br />
          <button onClick={handleShort}>Submit</button>
        </>
      )}
      {currentQ.type === 'match' && (
        <>
          {Object.keys(currentQ.pairs).map((left, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <label>{left}</label>
              <select
                value={matchAnswers[left] || ''}
                onChange={(e) =>
                  setMatchAnswers({ ...matchAnswers, [left]: e.target.value })
                }
              >
                <option value="">Select</option>
                {Object.values(currentQ.pairs).map((opt, j) => (
                  <option key={j} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
          <button onClick={handleMatchSubmit}>Submit Matches</button>
        </>
      )}
    </div>
  );
};

export default CustomQuizStart;






