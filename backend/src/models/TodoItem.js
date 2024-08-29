import db from "../database/database.js";

const todoItemSchema = db.mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    changedAt: {
        type: Date,
        default: Date.now
    },

    complete: {
        type: Boolean,
        default: false
      },
})

TodoItemSchema.pre('save', function (next) {
    this.changedAt = Date.now();
    next();
  });

const TodoItem = db.mongoose.model("TodoItem", todoItemSchema);

export default TodoItem;