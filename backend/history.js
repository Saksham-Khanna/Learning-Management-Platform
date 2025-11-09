// backend/routes/history.js
const express = require('express');
const router = express.Router();
const QuizHistory = require('../models/QuizHistory'); // ✅ Correct model name

// ✅ Save a quiz result
router.post('/', async (req, res) => {
  try {
    const { learnerEmail, quizTitle, score, total } = req.body;
    const percentage = ((score / total) * 100).toFixed(2);

    const entry = new QuizHistory({
      learnerEmail,
      quizTitle: quizTitle || 'General Quiz',
      score,
      total,
      percentage,
      date: new Date(),
    });

    await entry.save();
    console.log('✅ Quiz history saved for', learnerEmail);
    res.status(201).json({ message: 'Quiz history saved', entry });
  } catch (err) {
    console.error('❌ Error saving quiz history:', err);
    res.status(500).json({ message: 'Failed to save quiz history' });
  }
});

// ✅ Fetch learner’s quiz history
router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    console.log(`📊 Fetching history for: ${email}`);

    const history = await QuizHistory.find({ learnerEmail: email }).sort({ date: -1 });

    console.log(`✅ Found ${history.length} records for ${email}`);
    res.json(Array.isArray(history) ? history : []);
  } catch (err) {
    console.error('❌ Error fetching quiz history:', err);
    res.status(500).json({ message: 'Failed to fetch quiz history' });
  }
});

module.exports = router;
