import express from "express"
import TodoController from "../controllers/todoController.js"

const todoRouter = express.Router()

todoRouter.post("/create", TodoController.createTodo)

todoRouter.post("/edit", TodoController.editTodo)

todoRouter.post("/delete", TodoController.deleteTodo)

todoRouter.post("/getAll", TodoController.getAllCurrentUsersTodos)

export default todoRouter;

