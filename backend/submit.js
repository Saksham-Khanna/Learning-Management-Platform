const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Attempt = require('../models/Attempt');
const Learner = require('../models/Learner');
// @route   POST /api/submit
router.post('/', authMiddleware, async (req, res) => {
  const { itemId, correct, timeSpent, topic, mode } = req.body;

  try {
    // Step 1: Log the attempt
    const newAttempt = new Attempt({
      learnerId: req.user.id,
      itemId,
      correct,
      timeSpent,
      mode,
    });
    await newAttempt.save();

    // Step 2: Update learner mastery
    const learner = await Learner.findById(req.user.id);
    const currentMastery = learner.mastery.get(topic) || 0;
    const updatedMastery = correct
      ? Math.min(currentMastery + 0.05, 1)
      : Math.max(currentMastery - 0.03, 0);

    learner.mastery.set(topic, updatedMastery);
    learner.attempts.push({
      itemId,
      correct,
      timestamp: new Date(),
      timeSpent,
    });
    await learner.save();

    res.json({ message: 'Attempt logged and mastery updated', mastery: updatedMastery });
  } catch (err) {
    res.status(500).json({ message: 'Submission failed' });
  }
});

module.exports = router;


