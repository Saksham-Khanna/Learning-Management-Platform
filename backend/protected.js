const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/protected
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({
    message: `Welcome, user ${req.user.id} with role ${req.user.role}`
  });
});

module.exports = router;
