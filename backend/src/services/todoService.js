import TodoItem from "../models/TodoItem.js";
import TodoList from "../models/TodoList.js";

class TodoService {
    static async addTodo(userId, title, description) {
        try {
            // Find the user's todo list
            let todoList = await TodoList.findOne({ user: userId });

            // If no todo list exists, create one
            if (!todoList) {
                todoList = new TodoList({ user: userId });
                await todoList.save();
            }

            if (this.getSpecificTodo(userId, title))
                throw new Error("Todo with this title already exist!")

            // Create a new todo item
            const newTodo = new TodoItem({ title: title, description: description, user: userId });

            // Save the new todo item
            const savedTodo = await newTodo.save();

            // Add the new todo item to the todo list
            todoList.todos.push(savedTodo._id);
            await todoList.save();

            return savedTodo;
        } catch (ex) {
            throw new Error("Failed to create todo.", ex.message);
        }
    }

    static async editTodo(userId, title, description, complete) {
        try {
            const todo = await this.getSpecificTodo(userId, title);

            if (todo) {
                if (description) todo.description = description;
                if (complete !== undefined) todo.complete = complete;

                return await todo.save();
            }

            throw new Error(`Failed to edit todo with title: ${title}`);
        } catch (ex) {
            throw new Error(ex);
        }
    }

    static async deleteTodo(userId, title) {
        try {
            const todoList = await TodoList.findOne({ user: userId });
    
            if (!todoList) {
                throw new Error(`Todo list not found for user with ID: ${userId}`);
            }
    
            // Find the index of the todo with the specified title
            const todoIndex = todoList.todos.findIndex(todo => todo.title === title);
    
            if (todoIndex > -1) {
                // Remove the todo from the todos array
                todoList.todos.splice(todoIndex, 1);
                // Save the updated todoList
                await todoList.save();
                return { message: "Todo deleted successfully" };
            } else {
                throw new Error(`Todo with title "${title}" not found in the list`);
            }
        } catch (ex) {
            throw new Error(ex.message || "An error occurred while deleting the todo");
        }
    }
    

    static async getUserTodos(userId) {
        try {
            const todoList = await TodoList.findOne({ user: userId }).populate('todos');
            return todoList ? todoList.todos : [];
        } catch (ex) {  
            throw new Error("Failed to get todos.");
        }
    }

    static async getSpecificTodo(userId, title) {
        try {
            // Find the user's todo list
            let todoList = await TodoList.findOne({ user: userId });

            // If no todo list exists, create one
            if (!todoList) {
                throw new Error("User doesn't have a list yet!")
            }

            // Find the TodoItems in the user's todo list
            const todoItems = await TodoItem.find({ _id: { $in: todoList.todos } });

            // Find the TodoItem with the given title
            const specificTodo = todoItems.find(todo => todo.title === title);

            if (!specificTodo)
                return null

            return specificTodo;
        } catch (ex) {
            throw new Error(ex.message);
        }
    }
}

export default TodoService;
