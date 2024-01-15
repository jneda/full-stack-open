import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../reducers/userReducer";
import { notify } from "../reducers/notificationReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";
import LoginForm from "./LoginForm";

import { Container } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      dispatch(setUser(user));
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      navigate("/");

      dispatch(notify(`${user.name} logged in.`, "success"));
    } catch (exception) {
      const errorMessage =
        exception.response && exception.response.data
          ? exception.response.data.error
          : "An unexpected error occurred.";
      dispatch(notify(errorMessage, "error"));
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <h2>Log in</h2>
      <LoginForm onLogin={handleLogin} />
    </Container>
  );
};

export default Login;
