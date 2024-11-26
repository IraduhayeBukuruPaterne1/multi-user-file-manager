const express = require("express");
const { register, login } = require("../src/controllers/authController");

const router = express.Router();

// Routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;