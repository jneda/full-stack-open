import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]);

  const submit = (e) => {
    e.preventDefault();

    login({ variables: { username, password } });

    setUsername("");
    setPassword("");
  };

  if (!show) return null;

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password{" "}
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  show: PropTypes.bool,
  setToken: PropTypes.func,
};

export default LoginForm;
