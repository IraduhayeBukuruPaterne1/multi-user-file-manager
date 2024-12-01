const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const i18n = require("i18n");
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/multiUserFileManager")
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.log(err));

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Middleware Setup
app.use(cors());
app.use(bodyParser.json());
app.use(i18n.init);
app.use(i18n.middleware);


// Routes
app.use("/users", userRoutes);
app.use("/files", fileRoutes);
// Use the file upload routes
app.use('/api', uploadRoutes);

// Default route to check if server is running
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Multi-User File Manager!" });
});

const { addFileUploadJob } = require('./queue');

// Use the queue in your file upload route
router.post('/upload', authenticate, upload.single('file'), async(req, res) => {
    try {
        addFileUploadJob(req.file); // Add the file to the queue
        res.status(200).json({ message: 'File upload queued for processing' });
    } catch (error) {
        console.error('Queue error:', error);
        res.status(500).json({ message: 'Error adding file to queue' });
    }
});
// Initialize i18next
app.get('/', (req, res) => {
    res.send(req.t('welcome')); // Example of using a translation (make sure 'welcome' is in your JSON files)
});
// Add i18n middleware to Express
app.use(middleware.handle(i18next));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});