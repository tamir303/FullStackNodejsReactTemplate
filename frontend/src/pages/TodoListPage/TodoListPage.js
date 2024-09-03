import React, { useState, useLayoutEffect } from "react";
import TodoList from "./components/TodoList.js";
import { Container, Typography, Box, Button, TextField } from "@mui/material";
import * as TodoAPI from "../../services/todoService.js";
import * as TodoUtils from "../../utils/todoUtils.js";
import "./TodoListPage.css";

const TodoListPage = () => {
  // State variables
  const [todos, setTodos] = useState([]); // Holds the list of todos
  const [newTitle, setNewTitle] = useState(""); // Title of the new or edited todo
  const [newDescription, setNewDescription] = useState(""); // Description of the new or edited todo
  const [todoClicked, setTodoClicked] = useState(""); // Tracks the currently selected todo

  /* HOOKS */

  // Fetch todos when the component mounts
  useLayoutEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await TodoAPI.getAllCurrentUserTodos(); // API call to fetch todos
        setTodos(fetchedTodos || []); // Set the fetched todos or an empty array if none found
      } catch (error) {
        console.error("Failed to fetch todos:", error); // Log any error that occurs
      }
    };

    fetchTodos(); // Call the function to fetch todos
  }, []);

  /* UI ACTIONS */

  // Handle clicks on a todo item
  const handleTodoClick = async (title) => {
    // Check if the clicked title is different from the currently selected todo
    if (title !== todoClicked) {
      // Find the relevant todo in the list
      const todo = await TodoUtils.getTodoFromTitle(todos, title);
      // Set the selected todo's title and description to the input fields
      setTodoClicked(todo.title);
      setNewTitle(todo.title);
      setNewDescription(todo.description);
    } else {
      // If the same todo is clicked again, clear the fields
      setTodoClicked("");
      setNewTitle("");
      setNewDescription("");
    }
  };

  /* TODO API ACTIONS */

  // Add a new todo
  const addTodo = async () => {
    // Prevent adding empty todos
    if (!newTitle || !newDescription) return; 
    try {
      const newTodo = await TodoAPI.createTodo(newTitle, newDescription); // API call to create a new todo
      setTodos((prevTodos) => [...prevTodos, { ...newTodo }]); // Update the todos state
      setNewTitle(""); // Clear the title input
      setNewDescription(""); // Clear the description input
    } catch (error) {
      console.error("Failed to add todo:", error); // Log any error that occurs
    }
  };

  // Edit an existing todo
  const editTodo = async () => {
    // Prevent editing to empty values
    if (!newTitle || !newDescription) return; 
    try {
      await TodoAPI.editTodo(newTitle, newDescription); // API call to edit the todo
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.title === todoClicked ? { ...todo, description: newDescription } : todo // Update the edited todo
        )
      );
      // Clear the fields after editing
      setNewTitle("");
      setNewDescription("");
      setTodoClicked(""); // Reset the selected todo
    } catch (error) {
      console.error("Failed to edit todo:", error); // Log any error that occurs
    }
  };

  // Remove a todo
  const removeTodo = async (title) => {
    try {
      await TodoAPI.deleteTodo(title); // API call to delete the todo
      setTodos(todos.filter(todo => todo.title !== title)); // Update the todos state to remove the deleted todo

      // Clear title and description if the removed todo was selected
      if (todoClicked === title) {
        setTodoClicked("");
        setNewTitle("");
        setNewDescription("");
      }
    } catch (error) {
      console.error("Failed to remove todo:", error); // Log any error that occurs
    }
  };

  // Toggle completion status of a todo
  const toggleComplete = async (title) => {
    try {
      const todo = await TodoUtils.getTodoFromTitle(todos, title); // Get the todo to toggle
      await TodoAPI.editTodo(title, todo.description, !todo.complete); // API call to update completion status
      setTodos(
        todos.map((todo) =>
          todo.title === title ? { ...todo, complete: !todo.complete } : todo // Update the todo in state
        )
      );
    } catch (error) {
      console.error("Failed to edit todo:", error); // Log any error that occurs
    }
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
            onChange={(e) => setNewTitle(e.target.value)} // Update title state on change
            fullWidth
            margin="normal"
            className="textField"
            disabled={todoClicked !== ""} // Disable input if a todo is selected
            variant="outlined"
            sx={todoClicked !== "" && { backgroundColor: (theme) => theme.palette.action.disabledBackground }} // Change background if disabled
          />
          <TextField
            label="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)} // Update description state on change
            fullWidth
            margin="normal"
            className="textField"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={todoClicked !== "" ? editTodo : addTodo} // Call editTodo or addTodo based on the current state
            fullWidth
            className={todoClicked !== "" ? "editButton" : "addButton"} // Change class based on state
          >
            {todoClicked !== "" ? "Edit Todo" : "Add Todo"} // Change button text based on state
          </Button>
        </Box>
        {
          !Array.isArray(todos) ? ( // Show loading message if todos is not an array
            <Typography variant="h6">Loading...</Typography>
          ) : todos.length === 0 ? ( // Show message if no todos are found
            <Typography variant="h6">No Todos...</Typography>
          ) : (
            <TodoList
              todos={todos}
              removeTodo={removeTodo} // Pass removeTodo function
              toggleComplete={toggleComplete} // Pass toggleComplete function
              handleTodoClick={handleTodoClick} // Pass handleTodoClick function
              todoClicked={todoClicked} // Pass the currently clicked todo title
            />
          )
        }
      </Box>
    </Container>
  );
};

export default TodoListPage;
