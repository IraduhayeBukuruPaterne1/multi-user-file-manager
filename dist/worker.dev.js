"use strict";

var fileUploadQueue = require("./queue");

var fs = require("fs");

var path = require("path");

fileUploadQueue.process(function _callee(job) {
  var _job$data, userId, fileName, filePath, processedPath;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _job$data = job.data, userId = _job$data.userId, fileName = _job$data.fileName, filePath = _job$data.filePath; // Simulate processing 

          processedPath = path.join(__dirname, "processed", fileName);
          _context.prev = 2;
          //moving the file
          fs.renameSync(filePath, processedPath);
          console.log("File processed for user ".concat(userId, ": ").concat(fileName));
          return _context.abrupt("return", {
            status: "success",
            processedPath: processedPath
          });

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](2);
          console.error("Error processing file: ".concat(_context.t0.message));
          throw new Error("Processing failed for ".concat(fileName));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 8]]);
});