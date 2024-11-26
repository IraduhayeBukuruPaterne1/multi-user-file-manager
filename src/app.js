const express = require("express");
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");

// Load translations
i18next.use(i18nextMiddleware.LanguageDetector).init({
  resources: {
    en: { translation: { welcome: "Welcome to the File Manager!" } },
    fr: { translation: { welcome: "Bienvenue au gestionnaire de fichiers!" } },
  },
  fallbackLng: "en",
  detection: {
    order: ["querystring", "cookie"],
    caches: ["cookie"],
  },
});

const app = express();

// Middleware
app.use(express.json());
app.use(i18nextMiddleware.handle(i18next));

// Sample route
app.get("/", (req, res) => {
  res.send(req.t("welcome"));
});

module.exports = app;

const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);
