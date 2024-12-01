const express = require("express");
const multer = require("multer");
const path = require("path");
const File = require("../models/File");
const User = require("../models/User");
const authenticate = require("../middleware/authMiddleware"); // Middleware for authentication

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/"); // Store files in the 'uploads' folder
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename
    }
});
const upload = multer({ storage: storage });

/**
 * @swagger
 * /files/upload:
 *   post:
 *     summary: Upload a file
 *     security:
 *       - bearerAuth: []
 *     description: This endpoint allows users to upload a file to their account.
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               userId:
 *                 type: string
 *                 description: The ID of the user uploading the file
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: File upload failed
 *       500:
 *         description: Internal server error
 */
router.post("/upload", authenticate, upload.single("file"), async(req, res) => {
    try {
        const userId = req.user.id; // Use authenticated user's ID

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Create a new file record
        const file = new File({
            userId: userId,
            fileName: req.file.filename,
            filePath: req.file.path,
            fileSize: req.file.size
        });

        // Save the file record to the database
        await file.save();
        res.status(200).send("File uploaded successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error uploading file");
    }
});

/**
 * @swagger
 * /files:
 *   get:
 *     summary: Retrieve all files for a user
 *     security:
 *       - bearerAuth: []
 *     description: This endpoint fetches all files uploaded by the authenticated user.
 *     tags: [Files]
 *     responses:
 *       200:
 *         description: List of files for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fileName:
 *                     type: string
 *                   filePath:
 *                     type: string
 *                   fileSize:
 *                     type: integer
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticate, async(req, res) => {
    try {
        const files = await File.find({ userId: req.user.id });
        res.status(200).json(files);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching files");
    }
});

/**
 * @swagger
 * /files/{id}:
 *   delete:
 *     summary: Delete a file by ID
 *     security:
 *       - bearerAuth: []
 *     description: This endpoint deletes a file by its unique ID for the authenticated user.
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The file ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
router.delete("/file/:id", authenticate, async(req, res) => {
    const { id } = req.params;

    try {
        const file = await File.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!file) {
            return res.status(404).send("File not found");
        }
        res.status(200).send("File deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting file");
    }
});

/**
 * @swagger
 * /files/{id}:
 *   get:
 *     summary: Retrieve a file by ID
 *     security:
 *       - bearerAuth: []
 *     description: This endpoint fetches a specific file by its unique ID for the authenticated user.
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The file ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fileName:
 *                   type: string
 *                 filePath:
 *                   type: string
 *                 fileSize:
 *                   type: integer
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
router.get("/file/:id", authenticate, async(req, res) => {
    const { id } = req.params;

    try {
        const file = await File.findOne({ _id: id, userId: req.user.id });
        if (!file) {
            return res.status(404).send("File not found");
        }
        res.status(200).json(file);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching file");
    }
});

/**
 * @swagger
 * /files/{id}/download:
 *   get:
 *     summary: Download a file by ID
 *     security:
 *       - bearerAuth: []
 *     description: This endpoint allows users to download a file by its unique ID for the authenticated user.
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The file ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File downloaded successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
router.get("/file/:id/download", authenticate, async(req, res) => {
    const { id } = req.params;

    try {
        const file = await File.findOne({ _id: id, userId: req.user.id });
        if (!file) {
            return res.status(404).send("File not found");
        }
        res.download(file.filePath);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error downloading file");
    }
});
router.get('/search', authenticate, async(req, res) => {
    const { query } = req.query;

    try {
        const files = await File.find({
            userId: req.user.id,
            fileName: new RegExp(query, 'i')
        });
        res.status(200).json(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error searching files' });
    }
});
module.exports = router;