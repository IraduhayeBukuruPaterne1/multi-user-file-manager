const { createClient } = require("redis");
const { logErrorToFile, handleTaskError } = require("./errorHandler");

const client = createClient({ url: "redis://127.0.0.1:6381" });

client.on("error", (err) => {
    console.error("Redis Client Error", err.message);
    logErrorToFile(err);
});

const dequeue = async() => {
    try {
        const task = await client.lpop("fileQueue");
        if (task) {
            console.log("Processing task:", task);

            const processUpload = (task) => {
                if (task.type === 'file_upload') {
                    const filePath = path.join(__dirname, 'uploads', task.file.filename);
                    uploadFileToServer(filePath, task.userId); // Hypothetical function to handle uploads
                    console.log(`File ${task.file.filename} uploaded successfully for user ${task.userId}`);
                }
            }; // Add your task-processing logic here

            // Simulate an error for testing
            // throw new Error("Sample error during task processing");
        } else {
            console.log("No tasks in the queue at the moment.");
        }
    } catch (error) {
        handleTaskError(null, error); // null if no specific task caused the error
    }
};

const main = async() => {
    try {
        await client.connect();
        console.log("Connected to Redis");

        // Poll the queue every 2 seconds
        setInterval(dequeue, 2000);
    } catch (error) {
        logErrorToFile(error);
    }
};

main();