import express from "express";
import { connectToMongo } from "../src/database/database.js";
import { authenticateJWT } from "./middleware/authMiddleware.js";

import defaultMiddlewares from "./middleware/defaultMiddlewars.js";
import loggerMiddleware from "./middleware/logMiddleware.js";
import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware.js";
import apiMiddlewares from "./middleware/apiMiddleware.js";

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

// Apply the array of api's route handlers to the app
apiMiddlewares.forEach(([path, ...handlers]) => {
    app.use(path, ...handlers);
});

// Error handle
app.use(errorHandlingMiddleware)
  
// Connect to MongoDB
connectToMongo();

export default app;
