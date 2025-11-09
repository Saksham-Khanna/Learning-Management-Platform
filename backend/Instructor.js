// backend/models/Instructor.js
const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'instructor' },
  quizzesCreated: [
    {
      quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
      title: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Instructor', instructorSchema);
