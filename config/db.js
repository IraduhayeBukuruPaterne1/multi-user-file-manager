const mysql = require('mysql2'); // Ensure you are using mysql2

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username', // Replace with your MySQL username
  password: 'your_password', // Replace with your MySQL password
  database: 'your_database' // Replace with your database name
});

// Export the pool for use in other files
module.exports = pool;
