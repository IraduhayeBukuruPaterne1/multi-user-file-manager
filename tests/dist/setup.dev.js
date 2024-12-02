"use strict";

var mongoose = require('mongoose');

beforeAll(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(mongoose.connection.readyState === 0)) {
            _context.next = 3;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect('mongodb://localhost:27017/testDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
afterEach(function _callee2() {
  var collections, _i, _collections, collectionName;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Clear database after each test
          collections = Object.keys(mongoose.connection.collections);
          _i = 0, _collections = collections;

        case 2:
          if (!(_i < _collections.length)) {
            _context2.next = 9;
            break;
          }

          collectionName = _collections[_i];
          _context2.next = 6;
          return regeneratorRuntime.awrap(mongoose.connection.collections[collectionName].deleteMany({}));

        case 6:
          _i++;
          _context2.next = 2;
          break;

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
});
afterAll(function _callee3() {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(mongoose.connection.close());

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
});