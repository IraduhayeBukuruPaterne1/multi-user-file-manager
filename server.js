const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const i18n = require("i18n");
const middleware = require("i18next-http-middleware");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { addFileUploadJob } = require("./queue");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose
    .connect("mongodb://localhost:27017/multiUserFileManager")
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.log(err));

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware Setup
app.use(cors());
app.use(bodyParser.json());
app.use(i18n.init);

// Initialize i18next (adjust configuration based on your needs)
i18n.configure({
    locales: ['en', 'fr'], // Example locales
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en',
});

// Routes
app.use("/users", userRoutes);
app.use("/files", fileRoutes);
app.use('/api', uploadRoutes);

// Default route to check if server is running
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Multi-User File Manager!" });
});

// File upload route (upload single file)
app.post("/upload", async(req, res) => {
    try {
        // Assuming 'req.file' is populated by multer or other middleware
        addFileUploadJob(req.file); // Add the file to the queue
        res.status(200).json({ message: 'File upload queued for processing' });
    } catch (error) {
        console.error('Queue error:', error);
        res.status(500).json({ message: 'Error adding file to queue' });
    }
});

// Translation route example (based on i18n configuration)
app.get('/', (req, res) => {
    res.send(req.t('welcome')); // 'welcome' is now the correct key
});
// Handle i18n middleware in Express
app.use(middleware.handle(i18n));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});