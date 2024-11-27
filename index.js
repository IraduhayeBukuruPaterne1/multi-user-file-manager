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

// index.js

const express = require('express');
const db = require('./config/db');  // Import the database connection

const app = express();

// Example: Test the database connection
db.getConnection()
  .then(connection => {
    console.log('Database connected successfully!');
    connection.release();  // Always release the connection after use
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

// Define other routes and middleware here if necessary

// Start the Express server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});