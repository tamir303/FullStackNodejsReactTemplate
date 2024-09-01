import React, { useState, useEffect, useLayoutEffect } from "react";
import TodoList from "./components/TodoList.js";
import { Container, Typography, Box, Button, TextField } from "@mui/material";
import { createTodo, deleteTodo, editTodo, getAllCurrentUserTodos } from "../../services/todoService.js";
import "./TodoListPage.css";

const TodoListPage = () => {
  const [todos, setTodos] = useState([]);  // Initialize with an empty array
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useLayoutEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getAllCurrentUserTodos();
        setTodos(Array.isArray(fetchedTodos) ? fetchedTodos : []);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    try {
      const newTodo = await createTodo(newTitle, newDescription);
      setTodos([...todos, newTodo]);
      setNewTitle("");
      setNewDescription("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const removeTodo = async (title) => {
    try {
      await deleteTodo(title);
      setTodos(todos.filter(todo => todo.title !== title));
    } catch (error) {
      console.error("Failed to remove todo:", error);
    }
  };

  const toggleComplete = (title) => {
    setTodos(
      todos.map((todo) =>
        todo.title === title ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  if (!Array.isArray(todos)) {
    return <Typography variant="h6">Loading...</Typography>;
  }

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
