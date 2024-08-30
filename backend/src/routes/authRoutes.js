import express from "express";
import UserController from "../controllers/userController.js";

const authRouter = express.Router();

/*
 * URL: /auth/register
 *
 * RequestBody: { 
 *     "username": string, 
 *     "password": string 
 * }
 * 
 * ResponseBody: { 
 *     "message": string, 
 *     "token": string 
 * }
*/
authRouter.post("/register", UserController.registerUser);

/*
 * URL: /auth/login
 * 
 * RequestBody: { 
 *     "username": string, 
 *     "password": string 
 * }
 * 
 * ResponseBody: { 
 *     "message": string, 
 *     "token": string 
 * }
 */
authRouter.post("/login", UserController.loginUser);

export default authRouter;
