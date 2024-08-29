import axios from "axios";

const register_endpoint = "http://localhost:4000/auth/register";
const login_endpoint =  "http://localhost:4000/auth/login";

// POST request for user registration
export const registerUser = async (username, password) => {
  const res = await axios.post(`${register_endpoint}`, {
    username,
    password,
  })
  .then(res => {
    // Set token cookie
    localStorage.setItem('token', res.data.token)

    return res.data.user;
  })
  .catch(ex => {
    throw new Error("Registration failed!");
  })
};

// POST request for user login
export const loginUser = async (username, password) => {
  const res = await axios.post(`${login_endpoint}`, {
    username,
    password,
  })
  .then(res => {
    // Set token cookie
    if (!localStorage.getItem('token')) 
      localStorage.setItem('token', res.data.token)

    return res.data.user;
  })
  .catch(ex => {
    throw new Error("Login failed!");
  })
};

export default { loginUser, registerUser };
