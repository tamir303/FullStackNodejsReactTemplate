import { swaggerSpec } from "../swagger/swagger.js";
import swaggerUi from "swagger-ui-express";

import todoRouter from "../routes/todoRoutes.js";
import authRouter from "../routes/authRoutes.js";

// Define an array of middlewares and routes
const apiMiddlewares = [
    // Serve Swagger UI at /api-docs
    ["/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)],
  
    // Register user-related routes at /auth
    ["/auth", authRouter],
  
    // Apply todo actions at /todo
    ["/todo", todoRouter]
];

export default apiMiddlewares