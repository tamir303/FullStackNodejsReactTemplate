import UserService from "../services/userService.js";
import config from "../config/index.js";
import {
  createTokenFromUserId,
  extractUserIdFromToken,
} from "../utils/userUtils.js";

class UserController {
  static registerUser = async (req, res) => {
    try {
      const user = await UserService.registerUser(req.body);

      if (!user) {
        // Failed to create user
        res.status(424).send("Failed to create user!");
      } else {
        // Success, create new token and return user
        const token = createTokenFromUserId(user._id);
        res.cookie("token", token, { httpOnly: true, secure: false });
        res.status(201).json(user);
      }
    } catch (ex) {
      res.status(500).send("Something went wrong!");
    }
  };

  static loginUser = async (req, res) => {
    try {
      if (!req.cookies?.token) {
        // Enter here if token not found in cookies
        // Try to login with user params
        const user = UserService.loginUser(
          req.body.username,
          req.body.password
        );

        if (user) {
          // Success login, create new token for user
          // TODO
          // {
          //   "messsage": "Cannot read properties of undefined (reading 'token')"
          // }
          const token = createTokenFromUserId(user._id);
          res.cookie("token", token, { httpOnly: true, secure: false });
          res.status(200).json(user);
        } else {
          // Failed to login, credentials are wrong!
          res.status(400).send("Failed to login!");
        }
      } else {
        // Token is found, extract userId from token
        const token = res.cookies.token;
        const userId = extractUserIdFromToken(token);
        const user = UserService.getUserById(userId);

        if (user) {
          // Success found user, return it
          res.status(200).json(user);
        } else {
          // Failure user wasn't found
          res.status(400).send("User not found!");
        }
      }
    } catch (ex) {
      res.status(500).json({ messsage: ex.message });
    }
  };
}

export default UserController;
