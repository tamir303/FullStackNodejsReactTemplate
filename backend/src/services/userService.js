import User from "../models/User.js";
import bcrypt from "bcrypt";

class UserService {
  static async registerUser(newUser) {
    try {
      const existUser = await User.findOne({ username: newUser.username });
      if (existUser) {
        console.error(`User ${newUser} already exist!`);
        return null;
      }

      return this.createNewUser(newUser);
    } catch (ex) {
      console.error(ex);
      throw new Error(ex);
    }
  }

  static async loginUser(username, password) {
    try {
      const existUser = await User.findOne({ username: username });
      if (!existUser) {
        console.error(`User ${username} wasn't found!`);
        return null;
      }

      if (await bcrypt.compare(password, existUser.password))
        return existUser;

      console.error(`User ${username} password is incorrect!`);
      return null;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  static async createNewUser(newUser) {
    try {
      const existUser = await User.findOne({ username: newUser.username });
      if (existUser) {
        console.error(`User ${newUser} already exist!`);
        return null;
      }

      const user = new User(newUser);
      return await user.save();
    } catch (ex) {
      throw new Error(ex);
    }
  }

  static async getUserByUsername(username) {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        console.error(`User ${username} wasn't found!`);
        return null;
      }

      return user;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  static async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        console.error(`User ${userId} wasn't found!`);
        return undefined;
      }

      return user;
    } catch (ex) {
      throw new Error(ex);
    }
  }
}

export default UserService;
