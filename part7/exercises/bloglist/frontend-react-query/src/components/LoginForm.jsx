import { useState } from "react";
import PropTypes from "prop-types";

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
    <>
      <form onSubmit={login} data-cy="login-form">
        <div>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            data-cy="username-input"
          />
        </div>
        <div>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            data-cy="password-input"
          />
        </div>
        <button type="submit" data-cy="login-submit">
          Log in
        </button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
