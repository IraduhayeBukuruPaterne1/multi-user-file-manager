const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db'); // DB connection (we'll set this up later)

// User Registration
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error registering user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// User Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

module.exports = router;
