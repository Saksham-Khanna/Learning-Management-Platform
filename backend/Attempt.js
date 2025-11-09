const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  learnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Learner', required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  correct: { type: Boolean, required: true },
  timeSpent: { type: Number }, // in seconds
  timestamp: { type: Date, default: Date.now },
  mode: { type: String, enum: ['diagnostic', 'formative', 'summative'], default: 'formative' }
}, { timestamps: true });

module.exports = mongoose.model('Attempt', attemptSchema);
