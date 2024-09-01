import axios from "axios";

const BASE_URL = "http://localhost:4000/todo";

// Create a reusable axios instance with a base URL
const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle API responses and errors
const handleResponse = (response) => response.data;

const handleError = (error, action) => {
  const message = error.response?.data?.message || error.message || "An error occurred";
  console.error(`${action} failed:`, message);
  throw new Error(`${action} failed: ${message}`);
};

// POST request for todo creation
export const createTodo = async (title, description) => {
  try {
    const response = await apiClient.post("/create", { title, description });
    return handleResponse(response);
  } catch (error) {
    handleError(error, "Todo creation");
  }
};

// POST request for todo edit
export const editTodo = async (title, description, complete) => {
  try {
    const response = await apiClient.post("/edit", { title, description, complete });
    return handleResponse(response);
  } catch (error) {
    handleError(error, "Todo editing");
  }
};

// POST request for todo deletion
export const deleteTodo = async (title) => {
  try {
    const response = await apiClient.post("/delete", { title });
    return handleResponse(response);
  } catch (error) {
    handleError(error, "Todo deletion");
  }
};

// GET request for all user's todos
export const getAllCurrentUserTodos = async () => {
  try {
    const response = await apiClient.get("/getAll");
    return handleResponse(response);
  } catch (error) {
    handleError(error, "Fetching todos");
  }
};