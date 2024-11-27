// config/db.js

const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',          // The host of your MySQL server (e.g., 'localhost')
  user: 'root',               // The MySQL username (default is usually 'root')
  password: 'yourpassword',   // Your MySQL password
  database: 'file_manager',   // The name of your database (replace 'file_manager' with your actual DB name)
  waitForConnections: true,
  connectionLimit: 10,        // Max number of connections allowed
  queueLimit: 0               // Limit for waiting for available connections
});

// Export the pool to use it in other parts of your app
module.exports = pool.promise();

// config/db.js

const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',          // The host of your MySQL server (e.g., 'localhost')
  user: 'root',               // The MySQL username (default is usually 'root')
  password: 'yourpassword',   // Your MySQL password
  database: 'file_manager',   // The name of your database (replace 'file_manager' with your actual DB name)
  waitForConnections: true,
  connectionLimit: 10,        // Max number of connections allowed
  queueLimit: 0               // Limit for waiting for available connections
});

// Export the pool to use it in other parts of your app
module.exports = pool.promise();