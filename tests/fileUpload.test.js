const request = require('supertest');
const app = require('../server');

describe('File Upload API', () => {
    it('should upload a file successfully', async() => {
        const response = await request(app)
            .post('/upload')
            .set('Authorization', 'Bearer <your-token>')
            .attach('file', '__tests__/sample.txt');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('File uploaded successfully');
    });
});
// "test": "echo \"Error: no test specified\" && exit 1"