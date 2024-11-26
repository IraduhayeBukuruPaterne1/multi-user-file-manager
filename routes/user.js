const express = require('express');
const router = express.Router();

// Example user route for registration
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Simulate registration logic here (e.g., save to the database)
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // For now, we just send a success response
  res.status(200).json({ message: "User registered successfully" });
});

// Example user route for login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Simulate login logic here (e.g., check credentials)
  if (email === "test@example.com" && password === "password123") {
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;