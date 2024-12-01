const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure correct path to the model

const authenticate = async(req, res, next) => {
    try {
        const token = req.header('Authorization');
        console.log('Authorization header:', token); // Debugging line to see if the token is received
        if (!token) {
            return res.status(401).json({ message: 'Access Denied. No token provided.' });
        }

        const tokenWithoutBearer = token.replace('Bearer ', '');
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        req.user = user; // Attach user to request
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Authentication Error:', err);
        return res.status(500).json({ message: 'Server error during authentication' });
    }
};

module.exports = authenticate;