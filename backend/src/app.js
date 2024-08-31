import express from "express";
import { connectToMongo } from "../src/database/database.js";
import defaultMiddlewares from "./middleware/defaultMiddlewars.js";
import authRouter from "./routes/authRoutes.js";
import { authenticateJWT } from "./middleware/authMiddleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger.js";
import loggerMiddleware from "./middleware/logMiddleware.js";
import todoRouter from "./routes/todoRoutes.js";

const app = express();

/**
 * Routes that bypass JWT authentication.
 */
const routesWithoutAuth = ["/auth/", "/api-docs/"];

// Apply default middlewares
app.use(defaultMiddlewares);

// Apply console logger middleware for debug
app.use(loggerMiddleware);

// Apply JWT authentication, excluding certain routes
app.use(authenticateJWT(routesWithoutAuth));

// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Register user-related routes
app.use('/auth', authRouter);

// Apply todo actions
app.use('/todo', todoRouter)

// Error handle
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
  
// Connect to MongoDB
connectToMongo();

export default app;
