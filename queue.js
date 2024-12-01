// queue.js
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Simulating a simple in-memory queue for demonstration
let queue = [];

// Function to add a job to the queue
const addFileUploadJob = (file) => {
    return new Promise((resolve, reject) => {
        try {
            // Add the file to the queue (in real apps, store this in a database or Redis)
            queue.push(file);
            console.log('File added to queue:', file.originalname);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

// Function to process jobs in the queue (e.g., process files)
const processQueue = async() => {
    while (queue.length > 0) {
        const file = queue.shift(); // Get the first file from the queue
        console.log(`Processing file: ${file.originalname}`);

        try {
            // Simulate a time-consuming file processing operation
            await processFile(file); // Process the file (you can modify this as per your logic)
            console.log(`File processed successfully: ${file.originalname}`);
        } catch (error) {
            console.error(`Error processing file: ${file.originalname}`, error);
        }
    }
};

// Simulated file processing (you can customize this to suit your needs, like saving the file or performing operations)
const processFile = async(file) => {
    return new Promise((resolve, reject) => {
        // Example: Saving the file to a specific directory
        const targetPath = path.join(__dirname, 'uploads', file.originalname);
        const writeStream = fs.createWriteStream(targetPath);
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);

        writeStream.write(file.buffer);
        writeStream.end();
    });
};

// Expose the functions to add jobs and process the queue
module.exports = {
    addFileUploadJob,
    processQueue
};