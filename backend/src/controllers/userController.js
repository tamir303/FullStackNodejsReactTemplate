import { UserDTO } from "../dto/UserDTO.js";
import UserService from "../services/userService.js";
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

        // Success creating user, return it
        const userDTO = new UserDTO(user)
        res.status(201).json({ user: userDTO, token });
      }
    } catch (ex) {
      res.status(500).send("Something went wrong!");
    }
  };

  static loginUser = async (req, res) => {
    try {
      let user;
      let token;

      if (req.cookies?.token) {
        // Token is found, extract userId from token
        token = req.cookies.token;
        const userId = extractUserIdFromToken(token);
        user = await UserService.getUserById(userId);

      } else {
        // Enter here if token not found in cookies
        // Try to login with user creds
        user = await UserService.loginUser(
          req.body.username,
          req.body.password
        );
      }

      if (user) {
        // If login successful and no token found, create new cookie token!
        if (!req.cookies?.token) {
          token = createTokenFromUserId(user._id);
          res.cookie("token", token, { httpOnly: true, secure: false });
        }

        // Success found user, return it
        const userDTO = new UserDTO(user)
        res.status(200).json({ user: userDTO, token });

      } else {
        // Failure user wasn't found
        res.status(400).send("User not found!");
      }
    } catch (ex) {
      res.status(500).json({ messsage: ex.message });
    }
  };
}

export default UserController;
