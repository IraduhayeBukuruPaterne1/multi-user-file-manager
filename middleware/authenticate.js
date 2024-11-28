const jwt = require('jsonwebtoken'); // Import jsonwebtoken to verify tokens

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Use the JWT_SECRET from .env
    req.user = decoded;  // Attach user info to request
    next();  // Move to the next middleware/route handler
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticate;
