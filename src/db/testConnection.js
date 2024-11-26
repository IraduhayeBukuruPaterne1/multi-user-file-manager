const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017"; // MongoDB connection string
const client = new MongoClient(uri);

async function connectToDb() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB!");
        
        // Access the "file_manager" database
        const db = client.db("file_manager");  // Specify the database name
        const collections = await db.listCollections().toArray(); // Check existing collections

        console.log("Existing collections:", collections);

        // Create the 'users' collection if it doesn't exist
        if (!collections.some(col => col.name === 'users')) {
            await db.createCollection('users');
            console.log("Created 'users' collection.");
        }

        // Optional: Insert a test document
        await db.collection('users').insertOne({
            username: "testuser",
            email: "testuser@example.com",
            password: "hashedpassword123"
        });
        console.log("Test user inserted.");

        return client;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit with failure
    }
}

connectToDb();