const express = require('express');
const multer = require('multer');
const authenticate = require('../middleware/authenticate');
const path = require('path');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Save to 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Timestamp the file name
    }
});

const upload = multer({ storage: storage });

// File upload route
router.post('/upload', authenticate, upload.single('file'), async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Ensure user is authenticated and attached to req.user
        const user = req.user;
        console.log('User uploading file:', user); // Debugging: Check the user

        res.status(200).json({
            message: 'File uploaded successfully',
            file: req.file
        });
    } catch (err) {
        console.error('Upload Error:', err);
        res.status(500).json({ message: 'Server error during file upload' });
    }
});

module.exports = router;