const path = require('path');
const request = require('supertest');
const app = require('../server'); // Assuming your Express app is in the 'server.js' file

describe('File Upload API', () => {
    it('should upload a file successfully', async() => {
        try {
            const filePath = path.join(__dirname, 'testFile.txt'); // Ensure this file exists

            const res = await request(app)
                .post('/api/upload/upload')
                .attach('file', filePath); // Attach the file to the request

            console.log('Response:', res.body);

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('File uploaded successfully');
        } catch (error) {
            console.error('Error during file upload:', error);
        }
    });
});