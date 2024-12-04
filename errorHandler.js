const fs = require("fs");
const path = require("path");

// error log file path
const logFilePath = path.join(__dirname, "error.log");


const logErrorToFile = (error) => {
    const errorMessage = `[${new Date().toISOString()}] ${error.stack || error.message || error}\n`;
    fs.appendFile(logFilePath, errorMessage, (err) => {
        if (err) console.error("Failed to write to log file:", err.message);
    });
};

const handleTaskError = (task, error) => {
    logErrorToFile(error);
    console.error(`Error processing task: ${JSON.stringify(task)}`, error.message);
};

module.exports = { logErrorToFile, handleTaskError };