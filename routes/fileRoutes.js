const express = require("express");
const multer = require("multer");
const path = require("path");
const File = require("../models/File");
const User = require("../models/User");
const authenticate = require("../middleware/authMiddleware");
// const i18n = require("i18n");
const i18next = require("i18next")

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

/**
 * @swagger
 * /files/upload:
 *   post:
 *     summary: Upload a file
 *     security:
 *       - bearerAuth: []
 *     description: Allows authenticated users to upload a file.
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
 *               language:
 *                 type: string
 *                 description: "Language preference for the message (default: en)"
 *                 enum:
 *                   - en
 *                   - fr
 *                   - es
 *                   - de
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Missing file or other errors
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       500:
 *         description: Internal server error
 */
router.post("/upload", authenticate, upload.single("file"), async(req, res) => {
    try {
        const userId = req.user.id;

        const { language = "en" } = req.body;

        // Ensure file is uploaded
        if (!req.file) return res.status(400).json({ message: i18n.__({ phrase: "No file uploaded", locale: language }) });

        // Create a new file document and save it in the database
        const file = new File({
            filename: req.file.originalname,
            filepath: req.file.path,
            userId: userId,
        });

        await file.save();

        // Return success response with localized message { lng: language }
        res.status(200).json({
            message: req.t("file_upload_success"),
            file: file,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: i18next.t("Error uploading file", { lng: req.body.language || "en" }) });
    }
});

/**
 * @swagger
 * /files:
 *   get:
 *     summary: Retrieve all files for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     tags: [Files]
 *     responses:
 *       200:
 *         description: Successfully retrieved files
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
 *                     type: number
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticate, async(req, res) => {
    try {
        const files = await File.find({ userId: req.user.id });
        res.status(200).json(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: i18n.__("fetch_failed") });
    }
});

/**
 * @swagger
 * /files/{id}:
 *   get:
 *     summary: Retrieve a file by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID
 *     responses:
 *       200:
 *         description: File retrieved successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticate, async(req, res) => {
    try {
        const file = await File.findOne({ _id: req.params.id, userId: req.user.id });
        if (!file) return res.status(404).send(i18n.__("file_not_found"));
        res.status(200).json(file);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: i18n.__("fetch_failed") });
    }
});

/**
 * @swagger
 * /files/{id}:
 *   delete:
 *     summary: Delete a file by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticate, async(req, res) => {
    try {
        const file = await File.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!file) return res.status(404).send(i18n.__("file_not_found"));
        res.status(200).json({ message: i18n.__("file_deleted") });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: i18n.__("delete_failed") });
    }
});

module.exports = router;