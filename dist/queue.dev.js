"use strict";

var Queue = require("bull"); // file uploads


var fileUploadQueue = new Queue("fileUploads", {
  redis: {
    host: "127.0.0.1",
    port: 6379
  }
}); // Event listeners

fileUploadQueue.on("completed", function (job, result) {
  console.log("Job completed: ".concat(job.id));
});
fileUploadQueue.on("failed", function (job, error) {
  console.error("Job failed: ".concat(job.id, " - ").concat(error.message));
});
module.exports = fileUploadQueue;