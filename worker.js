const fileUploadQueue = require("./queue");
const fs = require("fs");
const path = require("path");

fileUploadQueue.process(async(job) => {
    const { userId, fileName, filePath } = job.data;

    // Simulate processing 
    const processedPath = path.join(__dirname, "processed", fileName);

    try {
        //moving the file
        fs.renameSync(filePath, processedPath);

        console.log(`File processed for user ${userId}: ${fileName}`);
        return { status: "success", processedPath };
    } catch (error) {
        console.error(`Error processing file: ${error.message}`);
        throw new Error(`Processing failed for ${fileName}`);
    }
});