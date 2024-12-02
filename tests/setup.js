const mongoose = require('mongoose');

beforeAll(async() => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://localhost:27017/testDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
});

afterEach(async() => {
    // Clear database after each test
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        await mongoose.connection.collections[collectionName].deleteMany({});
    }
});

afterAll(async() => {
    await mongoose.connection.close();
});