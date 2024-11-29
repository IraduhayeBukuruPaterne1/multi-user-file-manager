const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const i18n = require("i18n");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const userRoutes = require("./routes/userRoutes"); // Update to match your file paths

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/multiUserFileManager")
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.log(err));

// Swagger setup
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Multi-User File Manager API",
            version: "1.0.0",
            description: "API documentation for the Multi-User File Manager app",
        },
        servers: [{
            url: "http://localhost:3000",
        }, ],
    },
    apis: ["./routes/*.js"], // Path to the API files (you'll point to your routes here)
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Middleware Setup
app.use(cors());
app.use(bodyParser.json());
app.use(i18n.init);

// Routes
app.use("/users", userRoutes);

// Default route to check if server is running
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Multi-User File Manager!",
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});