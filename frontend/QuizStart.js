import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  { id: 1, type: 'mcq', question: 'What is the capital of India?', options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'], answer: 'Delhi' },
  { id: 2, type: 'mcq', question: 'Which gas do plants absorb?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], answer: 'Carbon Dioxide' },
  { id: 3, type: 'mcq', question: 'What is H2O?', options: ['Oxygen', 'Hydrogen', 'Water', 'Salt'], answer: 'Water' },
  { id: 4, type: 'mcq', question: 'Which organ pumps blood?', options: ['Lungs', 'Brain', 'Heart', 'Liver'], answer: 'Heart' },
  { id: 5, type: 'mcq', question: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], answer: 'Mars' },
  { id: 21, type: 'fill', question: 'The chemical symbol for water is _______.', answer: 'H2O' },
  { id: 22, type: 'fill', question: 'The process by which plants make food is called _______.', answer: 'Photosynthesis' },
  {
    id: 50,
    type: 'match',
    question: 'Match the following:',
    pairs: { 'H2O': 'Water', 'CO2': 'Carbon Dioxide', 'O2': 'Oxygen' }
  }
];

const QuizStart = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [matchAnswers, setMatchAnswers] = useState({});
  const navigate = useNavigate();

  const currentQ = questions[current];

  // ✅ Helper to move to next question
  const nextQuestion = async (extraScore = 0) => {
    const finalScore = score + extraScore;

    if (current + 1 < questions.length) {
      setScore(finalScore);
      setCurrent(current + 1);
      setUserInput('');
      setMatchAnswers({});
    } else {
      // ✅ Save result to MongoDB once
      const user = JSON.parse(localStorage.getItem('user'));
      const historyData = {
        learnerEmail: user?.email,
        name: user?.name || 'Anonymous',
        score: finalScore,
        total: questions.length,
        date: new Date().toISOString(),
      };

      try {
        await fetch('http://localhost:5000/api/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(historyData),
        });
        console.log('✅ Quiz result saved successfully');
      } catch (err) {
        console.error('❌ Error saving quiz result:', err);
      }

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

  const handleMatchSubmit = () => {
    let matchScore = 0;
    const correctPairs = currentQ.pairs;

    Object.entries(correctPairs).forEach(([left, right]) => {
      if (matchAnswers[left] === right) matchScore++;
    });

    nextQuestion(matchScore);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Quiz Time!</h2>
      <p>
        <strong>Question {current + 1} of {questions.length}</strong>
      </p>
      <p>{currentQ.question}</p>

      {/* ✅ Multiple Choice */}
      {currentQ.type === 'mcq' &&
        currentQ.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleMCQ(opt)}
            style={{ margin: '5px', padding: '8px 15px', cursor: 'pointer' }}
          >
            {opt}
          </button>
        ))}

      {/* ✅ Fill in the Blank */}
      {currentQ.type === 'fill' && (
        <>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Your answer"
            style={{ marginTop: '10px', padding: '5px' }}
          />
          <button onClick={handleFill} style={{ marginLeft: '10px' }}>Submit</button>
        </>
      )}

      {/* ✅ Matching */}
      {currentQ.type === 'match' && (
        <>
          {Object.keys(currentQ.pairs).map((left, i) => (
            <div key={i} style={{ margin: '10px 0' }}>
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
          <button onClick={handleMatchSubmit}>Submit</button>
        </>
      )}
    </div>
  );
};

export default QuizStart;
