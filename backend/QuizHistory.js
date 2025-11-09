// backend/models/QuizHistory.js
const mongoose = require('mongoose');

const quizHistorySchema = new mongoose.Schema({
  learnerEmail: { type: String, required: true },
  quizTitle: { type: String, default: 'General Quiz' },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  percentage: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('QuizHistory', quizHistorySchema);
