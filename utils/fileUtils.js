// utils/fileUtils.js
const fs = require('fs');
const path = require('path');

const uploadFileToServer = (filePath, userId) => {
    return new Promise((resolve, reject) => {
        // Simulate the file upload process
        const destinationPath = path.join(__dirname, 'serverUploads', userId, path.basename(filePath));

        // Ensure destination directory exists
        const destDir = path.dirname(destinationPath);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        // Simulate moving the file to the destination directory
        fs.copyFile(filePath, destinationPath, (err) => {
            if (err) {
                return reject(err); // Reject if an error occurs during file copy
            }
            resolve(); // Resolve when file is uploaded successfully
        });
    });
};

module.exports = { uploadFileToServer };