import React from "react";
import { ListItem, Checkbox, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete.js";
import "../TodoListPage.css";

const TodoItem = ({ todo, removeTodo, toggleComplete, handleTodoClick, isSelected }) => {
  return (
    <ListItem 
      className={`todoItem ${isSelected ? "selected" : ""}`} // Add a 'selected' class if the item is chosen
      onClick={() => handleTodoClick(todo.title)} // Handle click to set the item as selected
    >
      <Checkbox
        className="completed"
        checked={todo.complete}
        onChange={() => toggleComplete(todo.title)}
      />
      <ListItemText
        primary={todo.title}
        secondary={`${todo.description} - Created at: ${(new Date(todo.createdAt)).toLocaleString()}`}
        className="todoText"
      />
      <IconButton className="deleteButton" edge="end" onClick={() => removeTodo(todo.title)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
