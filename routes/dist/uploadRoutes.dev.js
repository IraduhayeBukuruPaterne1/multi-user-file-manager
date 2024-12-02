"use strict";

var express = require('express');

var multer = require('multer');

var authenticate = require('../middleware/authenticate');

var path = require('path');

var router = express.Router(); // Set up multer for file uploads

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './uploads'); // Save to 'uploads' folder
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Timestamp the file name
  }
});
var upload = multer({
  storage: storage
}); // File upload route

router.post('/upload', authenticate, upload.single('file'), function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (req.file) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'No file uploaded'
          }));

        case 3:
          // Ensure user is authenticated and attached to req.user
          user = req.user;
          console.log('User uploading file:', user); // Debugging: Check the user

          res.status(200).json({
            message: 'File uploaded successfully',
            file: req.file
          });
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error('Upload Error:', _context.t0);
          res.status(500).json({
            message: 'Server error during file upload'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
module.exports = router;