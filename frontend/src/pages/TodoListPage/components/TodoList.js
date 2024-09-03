import React from "react";
import TodoItem from "./TodoItem";
import { List } from "@mui/material";
import "../TodoListPage.css";

const TodoList = ({ todos, removeTodo, toggleComplete, handleTodoClick, todoClicked }) => {
  return (
    <List className="todoList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          toggleComplete={toggleComplete}
          handleTodoClick={handleTodoClick}
          isSelected={todoClicked === todo.title}
        />
      ))}
    </List>
  );
};

export default TodoList;
