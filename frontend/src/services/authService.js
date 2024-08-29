import axios from "axios";

const register_endpoint = "http://localhost:4000/auth/register";
const login_endpoint = "http://localhost:4000/auth/login";

// POST request for user registration
export const registerUser = async (username, password) => {
  try {
    const res = await axios.post(register_endpoint, {
      username,
      password,
    });

    console.log(res.data)

    if (res.data && res.data.token && res.data.user) {
      // Store token in localStorage
      localStorage.setItem("token", res.data.token);
      return res.data.user;
    } else {
      throw new Error("Invalid registration response");
    }
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("Registration failed!");
  }
};

// POST request for user login
export const loginUser = async (username, password) => {
  try {
    const res = await axios.post(login_endpoint, {
      username,
      password,
    });

    console.log(res.data)

    if (res.data && res.data.token && res.data.user) {
      // Store token in localStorage if not already stored
      if (!localStorage.getItem("token")) {
        localStorage.setItem("token", res.data.token);
      }

      return res.data.user;
    } else {
      throw new Error("Invalid login response");
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed!");
  }
};

export default { loginUser, registerUser };
