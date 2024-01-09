import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import Notifications from "./components/Notifications";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedBlogappUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleUsernameChange = ({ target }) => setUsername(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      showNotification(`${user.name} logged in.`, "success");
    } catch (exception) {
      const errorMessage = exception.response.data.error;
      showNotification(errorMessage, "error");
    }
  };

  const handleLogout = () => {
    const userName = user.name;
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    blogService.setToken(null);
    showNotification(`${userName} logged out.`, "success");
  };

  const handleTitleChange = ({ target }) => setTitle(target.value);
  const handleAuthorChange = ({ target }) => setAuthor(target.value);
  const handleUrlChange = ({ target }) => setUrl(target.value);

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    try {
      const createdBlog = await blogService.create({ title, author, url });
      const newBlogs = blogs.concat(createdBlog);
      setBlogs(newBlogs);
      showNotification(
        `${createdBlog.title} by ${createdBlog.author} added.`,
        "success"
      );
    } catch (exception) {
      const errorMessage = exception.response.data.error;
      showNotification(errorMessage, "error");
    }
  };

  const showNotification = (message, type) => {
    const setMessage = type === "success" ? setSuccessMessage : setErrorMessage;
    setMessage(message);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <>
      <Notifications
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      {user === null ? (
        <>
          <h2>Log in</h2>
          <LoginForm
            username={username}
            onUsernameChange={handleUsernameChange}
            password={password}
            onPasswordChange={handlePasswordChange}
            onLogin={handleLogin}
          />
        </>
      ) : (
        <>
          <Logout user={user} onLogout={handleLogout} />
          <h2>Add new blog</h2>
          <BlogForm
            title={title}
            onTitleChange={handleTitleChange}
            author={author}
            onAuthorChange={handleAuthorChange}
            url={url}
            onUrlChange={handleUrlChange}
            createBlog={handleCreateBlog}
          />
          <h2>Blogs</h2>
          <Blogs blogs={blogs} />
        </>
      )}
    </>
  );
};

export default App;
