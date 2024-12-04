"use strict";

var _require = require("redis"),
    createClient = _require.createClient;

var _require2 = require("./errorHandler"),
    logErrorToFile = _require2.logErrorToFile,
    handleTaskError = _require2.handleTaskError;

var client = createClient({
  url: "redis://127.0.0.1:6381"
});
client.on("error", function (err) {
  console.error("Redis Client Error", err.message);
  logErrorToFile(err);
});

var dequeue = function dequeue() {
  var task, processUpload;
  return regeneratorRuntime.async(function dequeue$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(client.lpop("fileQueue"));

        case 3:
          task = _context.sent;

          if (task) {
            console.log("Processing task:", task);

            processUpload = function processUpload(task) {
              if (task.type === 'file_upload') {
                var filePath = path.join(__dirname, 'uploads', task.file.filename);
                uploadFileToServer(filePath, task.userId); // Hypothetical function to handle uploads

                console.log("File ".concat(task.file.filename, " uploaded successfully for user ").concat(task.userId));
              }
            }; // Add your task-processing logic here
            // Simulate an error for testing
            // throw new Error("Sample error during task processing");

          } else {
            console.log("No tasks in the queue at the moment.");
          }

          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          handleTaskError(null, _context.t0); // null if no specific task caused the error

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var main = function main() {
  return regeneratorRuntime.async(function main$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          console.log("Connected to Redis"); // Poll the queue every 2 seconds

          setInterval(dequeue, 2000);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          logErrorToFile(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

main();