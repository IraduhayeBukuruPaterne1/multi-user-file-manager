const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, File Manager!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/register', (req, res) => {
    // Simulate user registration
    res.send('User registered!');
});

app.post('/login', (req, res) => {
    // Simulate user login
    res.send('User logged in!');
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const express = require('express');
const app = express();
const port = 3000; // You can change this to any available port
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors()); // For handling cross-origin requests

// Import Routes
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');

// Use Routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/files', fileRoutes); // File-related routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});