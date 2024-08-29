import React from "react";
import TodoItem from "./TodoItem";
import { List } from "@mui/material";
import "../TodoListPage.css";

const TodoList = ({ todos, removeTodo, toggleComplete }) => {
  return (
    <List className="todoList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          toggleComplete={toggleComplete}
        />
      ))}
    </List>
  );
};

export default TodoList;
