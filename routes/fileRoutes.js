const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/File');
const User = require('../models/user');

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Route to upload a file
router.post('/upload', upload.single('file'), async(req, res) => {
    const { userId, language = 'en' } = req.body; // Assuming userId and language are passed in the request body

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const newFile = new File({
            filename: req.file.originalname,
            filepath: req.file.path,
            userId,
            language,
        });

        await newFile.save();
        res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
        res.status(500).send('Error uploading file');
    }
});

// Route to get all files for a user
router.get('/files', async(req, res) => {
    const { userId } = req.query;

    try {
        const files = await File.find({ userId });
        res.status(200).json(files);
    } catch (error) {
        res.status(500).send('Error retrieving files');
    }
});

// Route to delete a file
router.delete('/file/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const file = await File.findByIdAndDelete(id);
        if (!file) {
            return res.status(404).send('File not found');
        }
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).send('Error deleting file');
    }
});

module.exports = router;