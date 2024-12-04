"use strict";

var fs = require("fs");

var path = require("path"); // error log file path


var logFilePath = path.join(__dirname, "error.log");

var logErrorToFile = function logErrorToFile(error) {
  var errorMessage = "[".concat(new Date().toISOString(), "] ").concat(error.stack || error.message || error, "\n");
  fs.appendFile(logFilePath, errorMessage, function (err) {
    if (err) console.error("Failed to write to log file:", err.message);
  });
};

var handleTaskError = function handleTaskError(task, error) {
  logErrorToFile(error);
  console.error("Error processing task: ".concat(JSON.stringify(task)), error.message);
};

module.exports = {
  logErrorToFile: logErrorToFile,
  handleTaskError: handleTaskError
};