"use strict";

var request = require('supertest');

var app = require('../server'); // Import the app


var mongoose = require('mongoose'); // Import mongoose for closing connection


describe('User Registration', function () {
  it('should register a new user successfully', function _callee() {
    var res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(request(app).post('/api/users/register').send({
              username: 'testuser',
              email: 'testuser@example.com',
              password: 'Password123!'
            }));

          case 2:
            res = _context.sent;
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe('User registered successfully');

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  });
}); // Cleanup after tests

afterAll(function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(mongoose.connection.close());

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
});