const express = require('express');
const app = express();

// Import Routes
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');

// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

const db = require('./config/db');  // Import the database connection

// Example: Test the database connection
db.getConnection()
  .then(connection => {
    console.log('Database connected successfully!');
    connection.release();  // Always release the connection after use
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
