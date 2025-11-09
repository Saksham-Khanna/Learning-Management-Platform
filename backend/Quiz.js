const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true }
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  description: { type: String },
  questions: { type: [questionSchema], required: true },
  instructor: { type: String } // optional, could be email or id later
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
