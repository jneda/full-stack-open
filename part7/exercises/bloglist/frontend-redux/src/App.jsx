import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { notify } from "./reducers/notificationReducer";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import Togglable from "./components/Togglable";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        dispatch(
          notify(
            `${error.response.statusText}: could not fetch blogs.`,
            "error",
          ),
        );
      }
    };

    fetchBlogs();
  }, [user, dispatch]);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedBlogappUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notifyException = (exception) => {
    const errorMessage =
      exception.response && exception.response.data
        ? exception.response.data.error
        : "An unexpected error occurred.";
    dispatch(notify(errorMessage, "error"));
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      dispatch(notify(`${user.name} logged in.`, "success"));
    } catch (exception) {
      notifyException(exception);
    }
  };

  const handleLogout = () => {
    const userName = user.name;
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    blogService.setToken(null);
    dispatch(notify(`${userName} logged out.`, "success"));
  };

  const handleCreateBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();

      const createdBlog = await blogService.create(newBlog);
      const newBlogs = blogs.concat(createdBlog);
      setBlogs(newBlogs);

      dispatch(
        notify(
          `${createdBlog.title} by ${createdBlog.author} added.`,
          "success",
        ),
      );
    } catch (exception) {
      notifyException(exception);
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

      dispatch(
        notify(
          `${blog.title} by ${blog.author} now has ${updatedBlog.likes} like${
            updatedBlog.likes !== 1 ? "s" : ""
          }.`,
          "success",
        ),
      );
    } catch (exception) {
      notifyException(exception);
    }
  };

  const handleDeleteBlog = async (blog) => {
    try {
      const confirmed = window.confirm(
        `Delete ${blog.title} by ${blog.author}?`,
      );
      if (!confirmed) return;

      await blogService.destroy(blog.id);
      const newBlogs = blogs.filter((b) => b.id !== blog.id);
      setBlogs(newBlogs);

      dispatch(
        notify(`${blog.title} by ${blog.author} has been deleted.`, "success"),
      );
    } catch (exception) {
      console.log(exception);
      notifyException(exception);
    }
  };

  return (
    <>
      <Notification />
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
          <Blogs
            blogs={blogs}
            onLike={handleUpdateLikes}
            user={user}
            onDelete={handleDeleteBlog}
          />
        </>
      )}
    </>
  );
};

export default App;
