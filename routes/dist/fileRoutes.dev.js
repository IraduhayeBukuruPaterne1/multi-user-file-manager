"use strict";

var express = require("express");

var multer = require("multer");

var path = require("path");

var File = require("../models/File");

var User = require("../models/User");

var authenticate = require("../middleware/authMiddleware"); // const i18n = require("i18n");


var i18next = require("i18next");

var router = express.Router(); // Configure multer for file uploads

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    return cb(null, "uploads/");
  },
  filename: function filename(req, file, cb) {
    return cb(null, Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: storage
});
/**
 * @swagger
 * /files/upload:
 *   post:
 *     summary: Upload a file
 *     security:
 *       - bearerAuth: []
 *     description: Allows authenticated users to upload a file.
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               language:
 *                 type: string
 *                 description: "Language preference for the message (default: en)"
 *                 enum:
 *                   - en
 *                   - fr
 *                   - es
 *                   - de
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Missing file or other errors
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       500:
 *         description: Internal server error
 */

router.post("/upload", authenticate, upload.single("file"), function _callee(req, res) {
  var userId, _req$body$language, language, file;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id;
          _req$body$language = req.body.language, language = _req$body$language === void 0 ? "en" : _req$body$language; // Ensure file is uploaded

          if (req.file) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: i18n.__({
              phrase: "No file uploaded",
              locale: language
            })
          }));

        case 5:
          // Create a new file document and save it in the database
          file = new File({
            filename: req.file.originalname,
            filepath: req.file.path,
            userId: userId
          });
          _context.next = 8;
          return regeneratorRuntime.awrap(file.save());

        case 8:
          // Return success response with localized message { lng: language }
          res.status(200).json({
            message: req.t("file_upload_success"),
            file: file
          });
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: i18next.t("Error uploading file", {
              lng: req.body.language || "en"
            })
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
/**
 * @swagger
 * /files:
 *   get:
 *     summary: Retrieve all files for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     tags: [Files]
 *     responses:
 *       200:
 *         description: Successfully retrieved files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fileName:
 *                     type: string
 *                   filePath:
 *                     type: string
 *                   fileSize:
 *                     type: number
 *       500:
 *         description: Internal server error
 */

router.get("/", authenticate, function _callee2(req, res) {
  var files;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(File.find({
            userId: req.user.id
          }));

        case 3:
          files = _context2.sent;
          res.status(200).json(files);
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: i18n.__("fetch_failed")
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
/**
 * @swagger
 * /files/{id}:
 *   get:
 *     summary: Retrieve a file by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID
 *     responses:
 *       200:
 *         description: File retrieved successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */

router.get("/:id", authenticate, function _callee3(req, res) {
  var file;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(File.findOne({
            _id: req.params.id,
            userId: req.user.id
          }));

        case 3:
          file = _context3.sent;

          if (file) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).send(i18n.__("file_not_found")));

        case 6:
          res.status(200).json(file);
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: i18n.__("fetch_failed")
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
/**
 * @swagger
 * /files/{id}:
 *   delete:
 *     summary: Delete a file by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */

router["delete"]("/:id", authenticate, function _callee4(req, res) {
  var file;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(File.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
          }));

        case 3:
          file = _context4.sent;

          if (file) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).send(i18n.__("file_not_found")));

        case 6:
          res.status(200).json({
            message: i18n.__("file_deleted")
          });
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: i18n.__("delete_failed")
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;