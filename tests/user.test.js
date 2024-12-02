const request = require('supertest');
const app = require('../server'); // Import the app
const mongoose = require('mongoose'); // Import mongoose for closing connection

describe('User Registration', () => {
    it('should register a new user successfully', async() => {
        const res = await request(app).post('/api/users/register').send({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'Password123!',
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('User registered successfully');
    });
});

// Cleanup after tests
afterAll(async() => {
    // Disconnect database connection
    await mongoose.connection.close();
});