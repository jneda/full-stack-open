import { useState } from "react";
import PropTypes from "prop-types";

import { Box, TextField, Button, Container } from "@mui/material";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();

    onLogin({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <Box component="form" onSubmit={login} data-cy="login-form" sx={{ mt: 1 }}>
      <TextField
        type="text"
        margin="normal"
        required
        fullWidth
        label="Username"
        name="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        data-cy="username-input"
      />
      <TextField
        type="password"
        margin="normal"
        required
        fullWidth
        label="Password"
        name="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        data-cy="password-input"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        data-cy="login-submit"
        sx={{ mt: 3, mb: 2 }}
      >
        Log in
      </Button>
    </Box>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
