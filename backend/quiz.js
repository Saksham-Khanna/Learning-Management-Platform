// backend/routes/quiz.js
const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Instructor = require('../models/Instructor');
const Learner = require('../models/Learner');

// 🧩 Instructor creates a quiz
router.post('/', async (req, res) => {
  try {
    const { title, topic, description, questions, instructor } = req.body;

    if (!title || !questions || !instructor) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newQuiz = new Quiz({ title, topic, description, questions, instructor });
    await newQuiz.save();

    // Optional: link to instructor
    await Instructor.findOneAndUpdate(
      { email: instructor },
      {
        $push: {
          quizzesCreated: {
            quizId: newQuiz._id,
            title: newQuiz.title,
          },
        },
      }
    );

    console.log('✅ Quiz created:', newQuiz.title);
    res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
  } catch (err) {
    console.error('❌ Error creating quiz:', err);
    res.status(500).json({ message: 'Failed to create quiz' });
  }
});

// 🧩 Fetch all quizzes (for preview)
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    console.error('❌ Error fetching quizzes:', err);
    res.status(500).json({ message: 'Failed to fetch quizzes' });
  }
});

// 🧩 Fetch single quiz (for preview by ID)
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    console.error('❌ Error fetching quiz by ID:', err);
    res.status(500).json({ message: 'Failed to fetch quiz' });
  }
});

module.exports = router;
