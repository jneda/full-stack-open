import { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import Notifications from "./components/Notifications";
import Togglable from "./components/Togglable";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const blogFormRef = useRef();

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

  const showNotification = (message, type) => {
    const setMessage = type === "success" ? setSuccessMessage : setErrorMessage;
    setMessage(message);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      showNotification(`${user.name} logged in.`, "success");
    } catch (exception) {
      const errorMessage = exception.response
        ? exception.response.data.error
        : "An unexpected error occurred.";
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

  const handleCreateBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();

      const createdBlog = await blogService.create(newBlog);
      const newBlogs = blogs.concat(createdBlog);
      setBlogs(newBlogs);

      showNotification(
        `${createdBlog.title} by ${createdBlog.author} added.`,
        "success"
      );
    } catch (exception) {
      const errorMessage = exception.response
        ? exception.response.data.error
        : "An unexpected error occurred.";
      showNotification(errorMessage, "error");
    }
  };

  const handleUpdateLikes = async (blog) => {
    try {
      const update = {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1,
      };
      delete update.id;

      const updatedBlog = await blogService.update(blog.id, update);
      const newBlogs = blogs.map((b) => (b.id !== blog.id ? b : updatedBlog));
      setBlogs(newBlogs);

      showNotification(
        `${blog.title} by ${blog.author} now has ${updatedBlog.likes} like${
          updatedBlog.likes !== 1 ? "s" : ""
        }.`,
        "success"
      );
    } catch (exception) {
      const errorMessage = exception.response
        ? exception.response.data.error
        : "An unexpected error occurred.";
      showNotification(errorMessage, "error");
    }
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
          <LoginForm onLogin={handleLogin} />
        </>
      ) : (
        <>
          <Logout user={user} onLogout={handleLogout} />
          <Togglable buttonLabel="Add a blog" ref={blogFormRef}>
            <h2>Add new blog</h2>
            <BlogForm createBlog={handleCreateBlog} />
          </Togglable>
          <h2>Blogs</h2>
          <Blogs blogs={blogs} onLike={handleUpdateLikes} />
        </>
      )}
    </>
  );
};

export default App;
