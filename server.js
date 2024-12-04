const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const i18next = require("i18next");
const middleware = require("i18next-http-middleware");
const Backend = require("i18next-fs-backend");
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
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Initialize i18next 
i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: "en",
        backend: {
            loadPath: "./locales/{{lng}}/translation.json",
        },
    });




// Middleware 
app.use(cors());
app.use(bodyParser.json());

app.use(middleware.handle(i18next));


// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Bull-Board
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
    queues: [new BullAdapter(fileUploadQueue)],
    serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());


// Routes
app.use("/users", userRoutes);
app.use("/files", fileRoutes);
app.use("/api", uploadRoutes);

app.use((req, res, next) => {
    const lang = req.query.lang || "en";
    req.i18n.changeLanguage(lang);
    console.log("Current language set to:", req.i18n.language);
    next();
});


app.get("/", (req, res) => {
    const message = req.t("Welcome to the Multi-User File Manager!");
    res.json({ message });
});

app.get("/api/set-language/:lang", (req, res) => {
    const { lang } = req.params;

    if (!i18next.options.preload.includes(lang)) {
        return res.status(400).json({ message: "Unsupported language" });
    }

    req.i18n.changeLanguage(lang);
    res.json({ message: `Language switched to ${lang}`, currentLocale: lang });
});

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app;
// Start server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });