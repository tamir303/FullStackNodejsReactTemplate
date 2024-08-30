import TodoItem from "../models/TodoItem";
import TodoList from "../models/TodoList";
import User from "../models/User.js";
import { extractUserIdFromToken } from "../utils/userUtils.js"

class TodoService {
    static async addTodo(userId, title, description) {
        try {

        } catch (ex) {
            throw new Error("Failed to create todo.");
        }
    }

    static async editTodo(userId, title, description, complete) {
        try {
            const todo = await this.getSpecificTodo(userId, title)

            if (todo) {
                if (description)
                    todo.description = description
                if (complete)
                    todo.complete = complete

                return todo.save()
            }

            throw new Error(`Failed to edit todo.", ${todo}`);
        } catch (ex) {
            throw new Error(ex);
        }
    }

    static async deteleTodo(userId, title) {
        try {
            const todo = await this.getSpecificTodo(userId, title)

            if (todo)
                return todo.deleteOne()

            throw new Error(`Failed to remove todo.", ${todo}`);
        } catch (ex) {
            throw new Error(ex);
        }
    }

    static async getUserTodos(userId) {
        try {
            const todoList = await TodoList.findOne({ user: userId })
            return todoList.todos
        } catch (ex) {
            throw new Error("Failed to get todos.");
        }
    }

    static async getSpecificTodo(userId, title) {
        try {
            const todoList = await TodoList.findOne({ user: userId })
            const todoItems = await TodoItem.find({ _id: { $in: todoList.todos } })
            return todoItems.filter(todo => todo.title = title)[0]
        } catch (ex) {
            throw new Error(ex);
        } 
    }

    static async getCurrentUserTodoList(token) {
        try {
            let currentUserTodoList;
            const userId = extractUserIdFromToken(token);
            const user = await User.findById(userId);

            if (!user) 
                throw new Error("Failed to find current user!");
    
            currentUserTodoList = await TodoList.findOne({ user: user._id });

            if (!currentUserTodoList)
                currentUserTodoList = await new TodoList({ user: user._id }).save()

            return currentUserTodoList;
        } catch (error) {
            console.error("Error retrieving the current user's todo list:", error);
            throw new Error("Unable to retrieve the todo list. Please try again later.");
        }
    }
    
}