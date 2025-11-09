const jwt = require('jsonwebtoken');

// 🔒 Middleware to verify authentication token
const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract token after "Bearer "

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: Malformed token' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = verified; // attach user to request object
    next(); // continue to next middleware/route
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = authMiddleware;
