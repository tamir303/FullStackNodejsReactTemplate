import User from "../models/User.js";
import bcrypt from "bcrypt";

class UserService {
  // Registers a new user after checking if the username already exists
  static async registerUser(newUser) {
    try {
      // Check if a user with the same username already exists
      const existUser = await User.findOne({ username: newUser.username });
      if (existUser) {
        console.error(`User ${newUser.username} already exists!`);
        return null; // Return null if the user already exists
      }

      // If the user doesn't exist, create a new user
      return this.createNewUser(newUser);
    } catch (ex) {
      console.error("Error during user registration:", ex);
      throw new Error("Failed to register user.");
    }
  }

  // Authenticates a user by username and password
  static async loginUser(username, password) {
    try {
      // Find the user by username
      const existUser = await User.findOne({ username });
      if (!existUser) {
        console.error(`User ${username} wasn't found!`);
        return null; // Return null if the user isn't found
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, existUser.password);
      if (isMatch) {
        return existUser; // Return the user if the password matches
      }

      console.error(`Password is incorrect for user ${username}!`);
      return null; // Return null if the password doesn't match
    } catch (ex) {
      console.error("Error during user login:", ex);
      throw new Error("Failed to log in user.");
    }
  }

  // Creates a new user and saves it to the database
  static async createNewUser(newUser) {
    try {
      // Check again if the user already exists (for safety)
      const existUser = await User.findOne({ username: newUser.username });
      if (existUser) {
        console.error(`User ${newUser.username} already exists!`);
        return null;
      }

      // Create a new User instance and save it to the database
      const user = new User(newUser);
      return await user.save(); // Return the saved user
    } catch (ex) {
      console.error("Error during user creation:", ex);
      throw new Error("Failed to create user.");
    }
  }

  // Retrieves a user by username
  static async getUserByUsername(username) {
    try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        console.error(`User ${username} wasn't found!`);
        return null; // Return null if the user isn't found
      }

      return user; // Return the user if found
    } catch (ex) {
      console.error("Error retrieving user by username:", ex);
      throw new Error("Failed to retrieve user by username.");
    }
  }

  // Retrieves a user by their ID
  static async getUserById(userId) {
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        console.error(`User ${userId} wasn't found!`);
        return null; // Return null if the user isn't found
      }

      return user; // Return the user if found
    } catch (ex) {
      console.error("Error retrieving user by ID:", ex);
      throw new Error("Failed to retrieve user by ID.");
    }
  }

  // Retrieves current user with token 
  static async getCurrentUser(token) {
    try {
        // Find the user by ID
        const userId = extractUserIdFromToken(token);
        const user = await User.findById(userId);

        if (!user) 
            throw new Error("Failed to find current user!");

        return user; // Return the user if found
    } catch (error) {
        console.error("Error retrieving the current user", error);
        throw new Error("Unable to retrieve the current user.");
    }
}
}

export default UserService;
