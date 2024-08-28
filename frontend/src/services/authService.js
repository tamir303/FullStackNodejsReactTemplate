import axios from "axios";

const register_endpoint = process.env.API_REGISTER_ENDPOINT;
const login_endpoint = process.env.API_LOGIN_ENDPOINT;

const apiClient = axios.create({
  baseURL: process.env.API_HOST,
  withCredentials: true,
});

// POST request for user registration
const registerUser = async (username, password) => {
  try {
    const res = apiClient.post(`${register_endpoint}`, {
      username,
      password,
    });

    return await res.data;
  } catch (ex) {
    throw new Error("Registration failed!");
  }
};

// POST request for user registration
const loginUser = async (username, password) => {
  try {
    const res = apiClient.post(`${login_endpoint}`, {
      username,
      password,
    });

    return await res.data;
  } catch (ex) {
    throw new Error("Login failed!");
  }
};

export default { loginUser, registerUser };
