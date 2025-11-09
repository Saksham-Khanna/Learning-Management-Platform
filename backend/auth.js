const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Learner = require('../models/Learner');
console.log('✅ auth.js loaded');


// @route   GET /api/auth/ping
router.get('/ping', (req, res) => {
  res.send('pong');
});

// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("📝 Registration attempt:", email);

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Learner.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const newUser = new Learner({
      name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role,
      mastery: {},
      attempts: [],
      streaks: {}
    });

    await newUser.save();
    console.log("✅ Registration successful:", newUser.email);

    res.status(201).json({ message: "User registered successfully", user: { name, email, role } });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});



// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔐 Login attempt:", email);

    if (!email || !password) {
      console.log("❌ Missing credentials");
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await Learner.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    console.log("🔍 Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is missing in .env");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("✅ Login successful:", user.email);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});
// @route   GET /api/auth/debug-schema
router.get('/debug-schema', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("123", 10);
    const testUser = new Learner({
      name: "DebugUser",
      email: "debug@example.com",
      password: hashedPassword,
      role: "learner",
      mastery: {},
      attempts: [],
      streaks: {}
    });
    await testUser.save();
    res.json({ message: "Manual save successful" });
  } catch (err) {
    console.error('🔥 Manual save error:', err);
    res.status(500).json({ message: "Manual save failed", error: err.message });
  }
});

module.exports = router;



