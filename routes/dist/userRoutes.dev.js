"use strict";

var express = require("express");

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var User = require("../models/User");

var authenticate = require("../middleware/authMiddleware");

var router = express.Router();
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint allows the creation of a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post("/", function _callee(req, res) {
  var _req$body, username, email, password, userExists, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          userExists = _context.sent;

          if (!userExists) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "User already exists"
          }));

        case 7:
          // const hashedPassword = await bcrypt.hash(password, 10);
          newUser = new User({
            username: username,
            email: email,
            password: password
          });
          _context.next = 10;
          return regeneratorRuntime.awrap(newUser.save());

        case 10:
          res.status(201).json({
            message: "User created successfully"
          });
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: "Internal server error"
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     description: This endpoint allows a user to login and receive a JWT token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login, returns a JWT token
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

router.post("/login", function _callee2(req, res) {
  var _req$body2, email, password, user, isMatch, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 8;
            break;
          }

          console.log("User not found:", email);
          return _context2.abrupt("return", res.status(400).json({
            message: "Invalid credentials"
          }));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 10:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 15;
            break;
          }

          console.log("Password does not match!");
          console.log(isMatch);
          return _context2.abrupt("return", res.status(400).json({
            message: "Invalid credentials"
          }));

        case 15:
          token = jwt.sign({
            userId: user._id
          }, process.env.JWT_SECRET, {
            expiresIn: "1h"
          });
          res.status(200).json({
            token: token
          });
          _context2.next = 23;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0);
          res.status(500).json({
            message: "Internal server error"
          });

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 19]]);
});
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: This endpoint retrieves a list of all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Internal server error
 */

router.get("/", authenticate, function _callee3(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          users = _context3.sent;
          res.status(200).json(users);
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: "Internal server error"
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: This endpoint retrieves a single user by their unique ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.get("/:id", authenticate, function _callee4(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 3:
          user = _context4.sent;

          if (user) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 6:
          res.status(200).json(user);
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: "Internal server error"
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: This endpoint updates a user's details by their unique ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.put("/:id", authenticate, function _callee5(req, res) {
  var _req$body3, username, email, password, user;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body3 = req.body, username = _req$body3.username, email = _req$body3.email, password = _req$body3.password;
          _context5.next = 4;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 4:
          user = _context5.sent;

          if (user) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 7:
          if (!password) {
            _context5.next = 11;
            break;
          }

          _context5.next = 10;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 10:
          user.password = _context5.sent;

        case 11:
          user.username = username || user.username;
          user.email = email || user.email;
          _context5.next = 15;
          return regeneratorRuntime.awrap(user.save());

        case 15:
          res.status(200).json({
            message: "User updated successfully"
          });
          _context5.next = 22;
          break;

        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json({
            message: "Internal server error"
          });

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 18]]);
});
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: This endpoint deletes a user by their unique ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router["delete"]("/:id", authenticate, function _callee6(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(req.params.id));

        case 3:
          user = _context6.sent;

          if (user) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 6:
          res.status(200).json({
            message: "User deleted successfully"
          });
          _context6.next = 13;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(500).json({
            message: "Internal server error"
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.post('/register', function (req, res) {
  var _req$body4 = req.body,
      username = _req$body4.username,
      email = _req$body4.email,
      password = _req$body4.password;

  if (username && email && password) {
    res.status(201).json({
      message: 'User registered successfully'
    });
  } else {
    res.status(400).json({
      message: 'Invalid input'
    });
  }
});
module.exports = router;