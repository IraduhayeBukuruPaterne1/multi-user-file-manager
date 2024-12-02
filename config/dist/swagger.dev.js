"use strict";

// swagger.js - API Documentation for Users and Files
var swaggerJsdoc = require("swagger-jsdoc");

var options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Multi-User File Manager API",
      version: "1.0.0",
      description: "API documentation for the Multi-User File Manager app"
    },
    servers: [{
      url: "http://localhost:3000"
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ["./routes/*.js"] // Adjust as needed

};
var swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;