const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const multer = require("multer");
const router = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows a new user to register by providing email, password, and username.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the new user
 *               email:
 *                 type: string
 *                 description: The email address of the new user
 *               password:
 *                 type: string
 *                 description: The password of the new user
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, missing required fields or invalid data
 */
router.post("/register", async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in an existing user
 *     description: This endpoint allows an existing user to log in by providing email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Bad request, missing required fields or invalid credentials
 */
router.post("/login", async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
        res.status(200).json({ message: "Logged in successfully", token });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;