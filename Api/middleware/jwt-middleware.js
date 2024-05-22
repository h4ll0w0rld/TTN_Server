const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded; // Attach decoded user information to the request object
    next();
  });
}
module.exports = authenticateToken;