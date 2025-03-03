import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { createTokenFromUserId, extractUserIdFromToken } from "../utils/userUtils.js"

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
          if (err.name === 'TokenExpiredError') {
            // Token expired, generate a new token
            const userId = extractUserIdFromToken(token)
            const newToken = createTokenFromUserId(userId)

            // Set the new token in the cookies
            res.cookie('token', newToken, { httpOnly: true });

            next();
          } else {
            return res.status(401).json({ message: `Invalid Token! ${err.message}` });
          }
        } else {
          next();
        }
      });
    } else {
      return res.status(403).send("Access Denied: No Token Provided!");
    }
  };
};
