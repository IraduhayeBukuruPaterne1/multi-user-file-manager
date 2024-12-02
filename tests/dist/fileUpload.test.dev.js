"use strict";

var path = require('path');

var request = require('supertest');

var app = require('../server'); // Assuming your Express app is in the 'server.js' file


describe('File Upload API', function () {
  it('should upload a file successfully', function _callee() {
    var filePath, res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            filePath = path.join(__dirname, 'testFile.txt'); // Ensure this file exists

            _context.next = 4;
            return regeneratorRuntime.awrap(request(app).post('/api/upload/upload').attach('file', filePath));

          case 4:
            res = _context.sent;
            // Attach the file to the request
            console.log('Response:', res.body);
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('File uploaded successfully');
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.error('Error during file upload:', _context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
});