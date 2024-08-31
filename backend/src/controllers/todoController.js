import TodoService from "../services/todoService.js";
import { verifyTokenAndExtractId } from "../utils/authUtils.js";
import { TodoDTO } from "../dto/TodoDTO.js"

class TodoController {
    // Creates a new todo item for the authenticated user
    static createTodo = async (req, res) => {
        try {
            // Extract user ID from the token and retrieve todo details from the request body
            const userId = verifyTokenAndExtractId(req);
            const todoTitle = req.body.title;
            const todoDescription = req.body.description;

            // Add the new todo using the service layer
            const todo = await TodoService.addTodo(userId, todoTitle, todoDescription);

            // Convert the todo to a DTO and return it in the response
            const todoDTO = new TodoDTO(todo);
            res.status(201).json({ todo: todoDTO });
        } catch (ex) {
            // Handle errors by returning a 500 status code and the error message
            res.status(500).json({ error: ex.message });
        }
    }

    // Edits an existing todo item for the authenticated user
    static editTodo = async (req, res) => {
        try {
            // Extract user ID and todo details from the request
            const userId = verifyTokenAndExtractId(req);
            const todoTitle = req.body.title;
            const todoDescription = req.body.description;
            const todoComplete = req.body.complete;

            // Update the todo using the service layer
            const todo = await TodoService.editTodo(userId, todoTitle, todoDescription, todoComplete);

            // Convert the todo to a DTO and return it in the response
            const todoDTO = new TodoDTO(todo);
            res.status(200).json({ todo: todoDTO });
        } catch (ex) {
            // Handle errors by returning a 500 status code and the error message
            res.status(500).json({ error: ex.message });
        }
    }

    // Deletes a todo item for the authenticated user
    static deleteTodo = async (req, res) => {
        try {
            // Extract user ID and the title of the todo to be deleted from the request
            const userId = verifyTokenAndExtractId(req);
            const todoTitle = req.body.title;

            // Delete the todo using the service layer
            await TodoService.deleteTodo(userId, todoTitle);

            // Return a success message
            res.status(200).json({ message: `Deleted Todo ${todoTitle}` });
        } catch (ex) {
            // Handle errors by returning a 500 status code and the error message
            res.status(500).json({ error: ex.message });
        }
    }

    // Retrieves all todo items for the authenticated user
    static getAllCurrentUsersTodos = async (req, res) => {
        try {
            // Extract user ID from the token
            const userId = verifyTokenAndExtractId(req);

            // Retrieve the user's todos using the service layer
            const todos = await TodoService.getUserTodos(userId);

            // Convert todos to DTO format
            const todosDTO = todos.map(todo => new TodoDTO(todo))

            // Return the todos in the response
            res.status(200).json({ todo: todosDTO });
        } catch (ex) {
            // Handle errors by returning a 500 status code and the error message
            res.status(500).json({ error: ex.message });
        }
    }
}

export default TodoController;
