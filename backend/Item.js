const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  question: { type: String, required: true },
  type: { type: String, enum: ['mcq', 'coding', 'short'], default: 'mcq' },
  options: [String], // Only for MCQs
  answer: { type: String, required: true },
  explanation: String,
  hint: String,
  tags: {
    topic: String,
    bloom: String, // e.g., "Understand", "Apply"
    difficulty: { type: Number, min: 1, max: 5 },
    skills: [String],
    outcomes: [String],
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
