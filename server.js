const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const i18n = require("i18n");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");

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

// Routes
app.use("/users", userRoutes);
app.use("/files", fileRoutes);

// Default route to check if server is running
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Multi-User File Manager!" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});