import swaggerJsdoc from "swagger-jsdoc";
import config from "../config/index.js";
import path from "path";

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
  apis: [
    path.resolve("./src/swagger/swagger.yaml")
  ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
