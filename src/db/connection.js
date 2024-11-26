const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017"; // Docker-hosted MongoDB instance
const client = new MongoClient(uri);

async function connectToDb() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB!");
        return client;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit with failure
    }
}

module.exports = connectToDb;