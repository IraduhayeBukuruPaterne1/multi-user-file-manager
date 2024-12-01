// i18n.js

const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const Middleware = require('i18next-http-middleware');

i18next
    .use(Backend)
    .use(Middleware)
    .init({
        fallbackLng: 'en', // Default language if no translation is available
        preload: ['en', 'de', 'fr'], // Languages you want to load
        ns: ['translations'], // Namespace for translations
        defaultNS: 'translations',
        backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json', // Path to your JSON files
        }
    });

module.exports = Middleware.handle(i18next); // Export the i18next middleware function