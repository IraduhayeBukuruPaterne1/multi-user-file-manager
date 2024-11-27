const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');  // Import the database connection

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());  // For handling cross-origin requests

// Test the database connection
db.getConnection()
  .then(connection => {
    console.log('Database connected successfully!');
    connection.release();  // Always release the connection after use
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

// Routes
app.get('/', (req, res) => {
    res.send('Hello, File Manager!');
});

app.post('/register', (req, res) => {
    // Simulate user registration
    res.send('User registered!');
});

app.post('/login', (req, res) => {
    // Simulate user login
    res.send('User logged in!');
});

// Import Routes
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');

// Use Routes
app.use('/api/users', userRoutes);  // User-related routes
app.use('/api/files', fileRoutes);  // File-related routes

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
