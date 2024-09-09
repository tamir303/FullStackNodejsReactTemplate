import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import { services } from "./services.js";
import rateLimitAndTimeout from "./middleware/rateLimitAndTimeoutMiddleware.js";
import loggerMiddleware from "./middleware/logMiddleware.js";

const app = express()

// Middleware setup
app.use(loggerMiddleware); // Apply requests logger
app.use(cors({credentials: true, origin: "http://localhost:3000"})); // Enable CORS only from frontend origin
app.use(helmet()); // Add security headers
app.use(morgan("combined")); // Log HTTP requests
app.disable("x-powered-by"); // Hide Express server information
app.use(rateLimitAndTimeout); // Apply the rate limit and timeout middleware to the proxy

// Set up proxy middleware for each service
services.forEach(({ route, target }) => {
    const proxyOptions = {
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^${route}`]: "",
      },
    };
  
    // Apply rate limiting and timeout middleware before proxying
    app.use(route, rateLimitAndTimeout, createProxyMiddleware(proxyOptions));
});

// Handler for route-not-found
app.use((_req, res) => {
    res.status(404).json({
      code: 404,
      status: "Error",
      message: "Route not found.",
      data: null,
    });
});

export default app