// authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware function to authenticate user using JWT
function authenticateUser(req, res, next) {
  // Extract the token from the request headers or query parameters
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your_secret_key');

    // Attach the user information to the request object
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authenticateUser;
