import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const authenticateJWT = (excludedRoutes = []) => {
  return (req, res, next) => {
    // Check if the request path is in the excluded routes
    if (excludedRoutes.some((route) => req.path.startsWith(route))) {
      return next(); // Skip token verification for excluded routes
    }

    // Get the token from the cookies
    const token = req.cookies?.token;

    if (token) {
      // Verify the token
      jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid Token!" });
        }
        next();
      });
    } else {
      return res.status(403).send("Access Denied: No Token Provided!");
    }
  };
};
