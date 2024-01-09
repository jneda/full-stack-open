import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
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
    } catch (exception) {
      const errorMessage = exception.response.data.error;
      setErrorMessage(errorMessage);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    blogService.setToken(null);
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
    } catch (exception) {
      console.log(exception);
      const errorMessage = exception.response.data.error;
      setErrorMessage(errorMessage);
    }
  };

  return (
    <>
      {user === null ? (
        <LoginForm
          username={username}
          onUsernameChange={handleUsernameChange}
          password={password}
          onPasswordChange={handlePasswordChange}
          onLogin={handleLogin}
        />
      ) : (
        <>
          <Logout user={user} onLogout={handleLogout} />
          <BlogForm
            title={title}
            onTitleChange={handleTitleChange}
            author={author}
            onAuthorChange={handleAuthorChange}
            url={url}
            onUrlChange={handleUrlChange}
            createBlog={handleCreateBlog}
          />
          <Blogs blogs={blogs} />
        </>
      )}
    </>
  );
};

export default App;
