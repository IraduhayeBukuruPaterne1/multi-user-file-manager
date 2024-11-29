const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/Pateno'; // Replace with your database name

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.error('Database connection error:', err));

// Example route
app.post('/login', (req, res) => {
    // Simulate user login
    res.send('User logged in!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});