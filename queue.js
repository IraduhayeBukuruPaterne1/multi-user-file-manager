const Queue = require("bull");

// file uploads
const fileUploadQueue = new Queue("fileUploads", {
    redis: {
        host: "127.0.0.1",
        port: 6379,
    },
});

// Event listeners
fileUploadQueue.on("completed", (job, result) => {
    console.log(`Job completed: ${job.id}`);
});

fileUploadQueue.on("failed", (job, error) => {
    console.error(`Job failed: ${job.id} - ${error.message}`);
});

module.exports = fileUploadQueue;