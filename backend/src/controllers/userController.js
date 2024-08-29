import { UserDTO } from "../dto/UserDTO.js";
import UserService from "../services/userService.js";
import {
  createTokenFromUserId,
  extractUserIdFromToken,
} from "../utils/userUtils.js";

class UserController {
  
  // Handles user registration
  static registerUser = async (req, res) => {
    try {
      // Attempt to register the user using the provided details from req.body
      const user = await UserService.registerUser(req.body);

      if (!user) {
        // If user registration fails, respond with a 424 status
        return res.status(424).send("Failed to create user!");
      }

      // If successful, create a token for the newly registered user
      const token = createTokenFromUserId(user._id);

      // Set the token as a cookie in the response
      // 'httpOnly' ensures the cookie is not accessible via JavaScript, enhancing security
      // 'secure' should be true in production to ensure the cookie is only sent over HTTPS
      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

      // Convert the user data to a UserDTO for safe data exposure
      const userDTO = new UserDTO(user);

      // Respond with the user data and the token
      res.status(201).json({ user: userDTO, token });
    } catch (ex) {
      // Log the error for debugging purposes
      console.error("Error during user registration:", ex);

      // Respond with a 500 status for internal server errors
      res.status(500).send("Internal server error during registration.");
    }
  };

  // Handles user login
  static loginUser = async (req, res) => {
    try {
      let user;
      let token = req.cookies?.token; // Check if a token is already present in cookies

      if (token) {
        // If a token is found, extract the user ID from the token
        const userId = extractUserIdFromToken(token);

        if (!userId) {
          // If the token is invalid or expired, respond with a 401 status
          return res.status(401).send("Invalid or expired token.");
        }

        // Fetch the user details using the extracted user ID
        user = await UserService.getUserById(userId);
      }

      if (!user) {
        // If no user was found (either no token or user ID was invalid), attempt to log in with credentials
        user = await UserService.loginUser(req.body.username, req.body.password);

        if (!user) {
          // If login fails, respond with a 400 status
          return res.status(400).send("Invalid username or password.");
        }

        // If login is successful, create a new token for the user
        token = createTokenFromUserId(user._id);

        // Set the token as a cookie in the response
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      }

      // Convert the user data to a UserDTO for safe data exposure
      const userDTO = new UserDTO(user);

      // Respond with the user data and the token
      res.status(200).json({ user: userDTO, token });
    } catch (ex) {
      // Log the error for debugging purposes
      console.error("Error during user login:", ex);

      // Respond with a 500 status for internal server errors
      res.status(500).json({ message: "Internal server error during login." });
    }
  };
}

export default UserController;
