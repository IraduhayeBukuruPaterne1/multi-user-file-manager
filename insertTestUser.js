const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/multiUserFileManager')
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.log('MongoDB connection error:', err));

const insertTestUser = async() => {
    try {
        const hashedPassword = await bcrypt.hash('244', 10); // Hash the password
        const user = new User({
            email: 'peace@gmail.com',
            username: 'peace',
            password: hashedPassword,
        });
        await user.save();
        console.log('Test user inserted successfully!');
    } catch (err) {
        console.error('Error inserting test user:', err);
    }
};

insertTestUser();