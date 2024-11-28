const express = require('express');
const db = require('./config/db'); // Make sure this path is correct
const app = express();
const port = 3000;

// Test the connection
db.query('SELECT 1', (err, result) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully!');
  }
});

// Add your routes and server start code here

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


app.post('/login', (req, res) => {
    // Simulate user login
    res.send('User logged in!');
});

const bodyParser = require('body-parser');
app.use(bodyParser.json(g));

