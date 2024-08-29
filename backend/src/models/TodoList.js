import mongoose from "mongoose";
import db from "../database/database.js";

const todoListSchema = db.mongoose.Schema({
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TodoItem'
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    },
})

const TodoList = db.mongoose.model("TodoList", todoListSchema);

export default TodoList;