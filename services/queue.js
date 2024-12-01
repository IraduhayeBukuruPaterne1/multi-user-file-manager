const Queue = require('bull');
const redis = require('redis');
const queue = require('./services/queue'); // Adjust based on file structure


// Create a Redis queue

const fileQueue = new Queue('file-queue', {
    redis: { host: '127.0.0.1', port: 6379 },
});
// Example: Adding a job to the queue
function addFileUploadJob(file) {
    fileQueue.add({ file });
}

// Process the queue
fileQueue.process(async(job) => {
    console.log('Processing file upload:', job.data.file);
    // Simulate a long-running task
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('File upload processed!');
});

module.exports = { fileQueue, addFileUploadJob };