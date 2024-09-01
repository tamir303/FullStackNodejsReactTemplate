import express from "express"
import TodoController from "../controllers/todoController.js"

const todoRouter = express.Router()

/*
 * URL: /todo/create
 *
 * RequestBody: { 
 *     "title": string, 
 *     "description": string 
 * }
 * 
 * ResponseBody: { 
 *     "title": string, 
 *     "description": string,
 *     "complete": boolean,
 *     "createdAt": date
 * }
*/
todoRouter.post("/create", TodoController.createTodo)

/*
 * URL: /todo/edit
 *
 * RequestBody: { 
 *     "title": string, 
 *     "description": string,
 *     "complete": boolean,
 * }
 * 
 * ResponseBody: { 
 *     "title": string, 
 *     "description": string,
 *     "complete": boolean,
 *     "createdAt": date
 * }
*/
todoRouter.post("/edit", TodoController.editTodo)

/*
 * URL: /todo/delete
 *
 * RequestBody: { 
 *     "title": string
 * }
 * 
 * ResponseBody: { 
 *    {
 *       "message": "Deleted Todo {title}"
 *    }
 * }
*/
todoRouter.post("/delete", TodoController.deleteTodo)

/*
 * URL: /todo/getAll
 * 
 * ResponseBody: [
 *    {
 *      "title": string,
 *      "description": string,
 *      "complete": boolean,
 *      "createdAt": date
 *    }
 * ]
*/
todoRouter.get("/getAll", TodoController.getAllCurrentUsersTodos)

export default todoRouter;

