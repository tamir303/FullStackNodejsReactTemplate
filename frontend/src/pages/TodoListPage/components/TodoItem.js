import React from "react";
import { ListItem, Checkbox, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../TodoListPage.css";


const TodoItem = ({ todo, removeTodo, toggleComplete }) => {
  return (
    <ListItem className="todoItem">
      <Checkbox
      className="completed"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <ListItemText
        primary={todo.title}
        secondary={`${todo.description} - Created at: ${todo.createdAt}`}
        className="todoText"
      />
      <IconButton className="deleteButton" edge="end" onClick={() => removeTodo(todo.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
