const { MongoClient } = require("mongodb");

// Connection URI for MongoDB (local or cloud-based)
const uri = "mongodb://127.0.0.1:27017"; // Use your local MongoDB or MongoDB Atlas URI

const client = new MongoClient(uri);

const connectToDb = async () => {
  try {
    await client.connect(); // Connect to MongoDB
    console.log("Connected to MongoDB successfully!");
    return client.db("file_manager"); // Connect to or create a database named "file_manager"
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectToDb;
