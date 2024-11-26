const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require('../routes/user');

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);

// MongoDB connection string (ensure your MongoDB is running on localhost:27017)
const mongoURI = "mongodb://127.0.0.1:27017/file_manager";  // Replace with your DB name

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error: ", err));

// Define a simple route for testing
app.get("/", (req, res) => {
    res.send("Welcome to the Multi-User File Manager API");
});

// Your routes can be added here

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
