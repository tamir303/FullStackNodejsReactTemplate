import React, { useState } from "react";
import TodoList from "./components/TodoList";
import { Container, Typography, Box, Button, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import "./TodoListPage.css"; 

const TodoListPage = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("user");

  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };
    setTodos([...todos, newTodo]);
    setNewTitle("");
    setNewDescription("");
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <Container className="container" maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>
        <Box mb={2}>
          <TextField
            label="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            fullWidth
            margin="normal"
            className="textField"
          />
          <TextField
            label="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            fullWidth
            margin="normal"
            className="textField"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addTodo}
            fullWidth
            className="addButton"
          >
            Add Todo
          </Button>
        </Box>
        <TodoList
          todos={todos}
          removeTodo={removeTodo}
          toggleComplete={toggleComplete}
        />
      </Box>
    </Container>
  );
};

export default TodoListPage;
