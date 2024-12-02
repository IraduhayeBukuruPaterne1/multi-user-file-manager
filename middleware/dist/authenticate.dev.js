"use strict";

var jwt = require("jsonwebtoken");

var i18next = require("i18next");

var authenticate = function authenticate(req, res, next) {
  var token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({
      message: i18next.t("unauthorized")
    });
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: i18next.t("forbidden")
    });
  }
};

module.exports = authenticate;