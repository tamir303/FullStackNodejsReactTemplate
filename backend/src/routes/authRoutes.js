import express from "express";
import UserController from "../controllers/userController.js";

const authRouter = express.Router();

authRouter.post("/register", UserController.registerUser);

authRouter.post("/login", UserController.loginUser);

export default authRouter;
