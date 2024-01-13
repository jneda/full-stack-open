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
import {
  initializeBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "./reducers/blogReducer";

const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => dispatch(initializeBlogs());

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
    blogFormRef.current.toggleVisibility();

    dispatch(createBlog(newBlog));
  };

  const handleUpdateLikes = async (blog) => {
    const update = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };

    dispatch(updateBlog(update));
  };

  const handleDeleteBlog = async (blog) => {
    try {
      const confirmed = window.confirm(
        `Delete ${blog.title} by ${blog.author}?`,
      );
      if (!confirmed) return;

      dispatch(deleteBlog(blog));
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
