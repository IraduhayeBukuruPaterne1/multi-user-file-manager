const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate'); // We'll create this later

// File Upload Route
router.post('/', authenticate, (req, res) => {
  // Assuming file upload logic will be handled by multer or similar
  const user_id = req.user.id; // Extracted from JWT token

  const { filename, filePath } = req.body;
  const query = 'INSERT INTO files (user_id, filename, file_path) VALUES (?, ?, ?)';

  connection.query(query, [user_id, filename, filePath], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file' });
    }
    res.status(201).json({ message: 'File uploaded successfully' });
  });
});

// Get Files for a User
router.get('/', authenticate, (req, res) => {
  const user_id = req.user.id;

  const query = 'SELECT * FROM files WHERE user_id = ?';
  connection.query(query, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching files' });
    }
    res.json(results);
  });
});

module.exports = router;
