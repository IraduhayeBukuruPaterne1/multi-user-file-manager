const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',  // Change this to your database host
  user: 'root',       // Your database username
  password: 'password',  // Your database password
  database: 'file_manager_db', // Your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export a function to get a connection from the pool
module.exports = pool.promise();  // Using promise-based API of mysql2
