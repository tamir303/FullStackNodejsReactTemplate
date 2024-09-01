import axios from "axios";

const BASE_URL = "http://localhost:4000/auth";

// Create a reusable axios instance with a base URL
const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
});

// Handle API responses and errors
const handleResponse = (response) => {
  if (response.data && response.data.token && response.data.user) {
    return response.data;
  } else {
    throw new Error("Invalid response structure");
  }
};

const handleError = (error, action) => {
  const message = error.response?.data?.message || error.message || "An error occurred";
  console.error(`${action} failed:`, message);
  throw new Error(`${action} failed: ${message}`);
};

// POST request for user registration
export const registerUser = async (username, password) => {
  try {
    const response = await apiClient.post("/register", { username, password });
    const data = handleResponse(response);

    // Store token in localStorage
    localStorage.setItem("token", data.token);
    return data.user;
  } catch (error) {
    handleError(error, "Registration");
  }
};

// POST request for user login
export const loginUser = async (username, password) => {
  try {
    const response = await apiClient.post("/login", { username, password });
    const data = handleResponse(response);

    // Store token in localStorage if not already stored
    if (!localStorage.getItem("token")) {
      localStorage.setItem("token", data.token);
    }

    return data.user;
  } catch (error) {
    handleError(error, "Login");
  }
};

export default { loginUser, registerUser };
