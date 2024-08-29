import express from "express";
import UserController from "../controllers/userController.js";

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * User Registration Schema
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: johndoe
 *         password:
 *           type: string
 *           example: password123
 *       required:
 *         - username
 *         - password
 *
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request (validation errors)
 *       500:
 *         description: Internal server error
 */
authRouter.post("/register", UserController.registerUser);

/**
 * User Login Schema
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: johndoe
 *         password:
 *           type: string
 *           example: password123
 *       required:
 *         - username
 *         - password
 *
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "your_jwt_token_here"
 *       400:
 *         description: Bad request (invalid credentials)
 *       401:
 *         description: Unauthorized (incorrect credentials)
 *       500:
 *         description: Internal server error
 */
authRouter.post("/login", UserController.loginUser);

export default authRouter;
