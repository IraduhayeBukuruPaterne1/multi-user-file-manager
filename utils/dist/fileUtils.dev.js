"use strict";

// utils/fileUtils.js
var fs = require('fs');

var path = require('path');

var uploadFileToServer = function uploadFileToServer(filePath, userId) {
  return new Promise(function (resolve, reject) {
    // Simulate the file upload process
    var destinationPath = path.join(__dirname, 'serverUploads', userId, path.basename(filePath)); // Ensure destination directory exists

    var destDir = path.dirname(destinationPath);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, {
        recursive: true
      });
    } // Simulate moving the file to the destination directory


    fs.copyFile(filePath, destinationPath, function (err) {
      if (err) {
        return reject(err); // Reject if an error occurs during file copy
      }

      resolve(); // Resolve when file is uploaded successfully
    });
  });
};

module.exports = {
  uploadFileToServer: uploadFileToServer
};