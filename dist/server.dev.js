"use strict";

var express = require("express");

var mongoose = require("mongoose");

var path = require("path");

var i18next = require("i18next");

var middleware = require("i18next-http-middleware");

var Backend = require("i18next-fs-backend");

var cors = require("cors");

var bodyParser = require("body-parser");

var swaggerUi = require("swagger-ui-express");

var swaggerSpec = require("./config/swagger");

var dotenv = require("dotenv");

var userRoutes = require("./routes/userRoutes");

var fileRoutes = require("./routes/fileRoutes"); // Corrected this import


var uploadRoutes = require("./routes/uploadRoutes");

var _require = require("./queue"),
    addFileUploadJob = _require.addFileUploadJob;

dotenv.config();
var app = express();
var PORT = process.env.PORT || 3000; // MongoDB connection

mongoose.connect("mongodb://localhost:27017/multiUserFileManager").then(function () {
  return console.log("MongoDB connected");
})["catch"](function (error) {
  return console.error("MongoDB connection error:", error);
}); // Initialize i18next with file-based backend

i18next.use(Backend).use(middleware.LanguageDetector).init({
  fallbackLng: "en",
  backend: {
    loadPath: "./locales/{{lng}}/translation.json"
  }
}); // Middleware setup

app.use(cors());
app.use(bodyParser.json()); // app.use(i18nextMiddleware.handle(i18next));
// i18next middleware

app.use(middleware.handle(i18next)); // Swagger setup

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Routes

app.use("/users", userRoutes);
app.use("/files", fileRoutes);
app.use("/api", uploadRoutes);
app.use(function (req, res, next) {
  var lang = req.query.lang || "en";
  req.i18n.changeLanguage(lang);
  console.log("Current language set to:", req.i18n.language);
  next();
});
app.get("/", function (req, res) {
  var message = req.t("Welcome to the Multi-User File Manager!");
  res.json({
    message: message
  });
});
app.get("/api/set-language/:lang", function (req, res) {
  var lang = req.params.lang;

  if (!i18next.options.preload.includes(lang)) {
    return res.status(400).json({
      message: "Unsupported language"
    });
  }

  req.i18n.changeLanguage(lang);
  res.json({
    message: "Language switched to ".concat(lang),
    currentLocale: lang
  });
});

if (process.env.NODE_ENV !== 'test') {
  var _PORT = process.env.PORT || 3000;

  app.listen(_PORT, function () {
    return console.log("Server running on http://localhost:".concat(_PORT));
  });
}

module.exports = app; // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });