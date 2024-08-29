import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const createTokenFromUserId = (userId) => {
  try {
    const token = jwt.sign({ id: userId }, config.jwtSecret, {
      expiresIn: "1h",
    });

    return token;
  } catch (ex) {
    throw Error(ex);
  }
};

export const extractUserIdFromToken = (token) => {
  try {
    // Decode token
    const decoded = jwt.decode(token, config.jwtSecret);
    const userId = decoded.id;

    return userId;
  } catch (ex) {
    throw Error(ex);
  }
};
