import swaggerJsdoc from "swagger-jsdoc";
import config from "./src/config/index.js";
import chalk from 'chalk';

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API Documentation",
      version: "1.0.0",
      description: "API documentation for my Node.js project",
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
