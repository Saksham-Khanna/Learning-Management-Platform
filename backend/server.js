// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const Learner = require('./models/Learner');
const Instructor = require('./models/Instructor');

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware (must come BEFORE routes)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.startsWith('http://localhost')) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());

// ✅ Logging middleware
app.use((req, res, next) => {
  console.log(`📥 Incoming request: ${req.method} ${req.url}`);
  next();
});

// ✅ Import routes
const quizRoutes = require('./routes/quiz');
const protectedRoutes = require('./routes/protected');
const historyRoutes = require('./routes/history');

// ✅ Use routes
app.use('/api/quiz', quizRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/history', historyRoutes);

console.log('✅ Routes loaded: quiz, protected, history');

// ========================
// Registration Route
// ========================
app.post('/api/register', async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    // Normalize input
    name = name?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();
    role = role?.trim().toLowerCase();

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingLearner = await Learner.findOne({ email });
    const existingInstructor = await Instructor.findOne({ email });

    if (existingLearner || existingInstructor) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    let newUser;
    if (role === 'instructor') {
      newUser = new Instructor({ name, email, password, role });
    } else {
      newUser = new Learner({ name, email, password, role });
    }
    await newUser.save();

    console.log(`✅ Registered ${role}:`, newUser.email, 'Password:', newUser.password);

    res.status(201).json({
      message: 'User registered successfully',
      user: { name, email, role }
    });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ message: 'Something went wrong during registration' });
  }
});

// ========================
// Login Route
// ========================
app.post('/api/auth/login', async (req, res) => {
  try {
    let { email, password } = req.body;

    console.log('🧾 Raw request body:', req.body);

    // Normalize input
    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!email || !password) {
      console.log('⚠️ Missing credentials');
      return res.status(400).json({ message: 'Email and password required' });
    }

    const learner = await Learner.findOne({ email });
    const instructor = await Instructor.findOne({ email });
    const user = learner || instructor;

    if (!user) {
      console.log(`❌ User not found: ${email}`);
      return res.status(400).json({ message: 'User not found' });
    }

    console.log(`🔐 Login attempt: ${email}`);
    console.log(`Stored password: "${user.password}", Entered: "${password}"`);

    if (user.password !== password) {
      console.log('🔍 Password match: false');
      return res.status(400).json({ message: 'Incorrect password' });
    }

    console.log('🔍 Password match: true');
    console.log('✅ Login successful for:', user.email);

    res.json({
      message: 'Login successful',
      user: { name: user.name, email: user.email, role: user.role },
    });

  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Something went wrong during login' });
  }
});

// ========================
// Test Route
// ========================
app.get('/', (req, res) => {
  res.send('Adaptive Learning API is running 🚀');
});

// ========================
// Start Server
// ========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
