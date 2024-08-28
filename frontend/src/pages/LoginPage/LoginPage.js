import React, { useState } from "react";
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

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      console.log("Logging in:", { username, password });
    } else {
      console.log("Registering:", { username, password });
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
