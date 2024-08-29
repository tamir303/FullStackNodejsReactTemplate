import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
} from "@mui/material";
import "./LoginPage.css"
import { loginUser, registerUser } from "../../services/authService.js"

const LoginRegister = () => {
  const navigate =  useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      let user;
      const action = isLogin ? 'Logging in' : 'Registering';
  
      console.log(`${action}:`, { username, password });
  
      if (isLogin) {
        user = await loginUser(username, password);
      } else {
        user = await registerUser(username, password);
      }
  
      console.log("User:", user);
  
      if (user?.username) {
        navigate(`/todos?user=${user.username}`);
      } else {
        throw new Error("User data is missing");
      }
    } catch (error) {
      console.error("API Auth request Internal Error:", error.message);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      <Container maxWidth="sm">
        <Paper elevation={3} className="paper">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" className="title">
              {isLogin ? "Login" : "Register"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="textField"
              />
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="textField"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="submitButton"
              >
                {isLogin ? "Login" : "Register"}
              </Button>
            </form>
            <Box mt={2}>
              <Typography variant="body2">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <Link onClick={toggleForm} className="link">
                  {isLogin ? "Register" : "Login"}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginRegister;
