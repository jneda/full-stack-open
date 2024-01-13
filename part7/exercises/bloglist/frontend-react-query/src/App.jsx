import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import loginService from "./services/login";
import blogService from "./services/blogs";

import { useNotify } from "./hooks/useNotification";

import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const notify = useNotify();

  const blogFormRef = useRef();

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,

    onSuccess: (createdBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(createdBlog));
      notify(`${createdBlog.title} by ${createdBlog.author} added.`, "success");
    },

    onError: (exception) => {
      const errorMessage = exception.response
        ? exception.response.data.error
        : "An unexpected error occurred.";
      notify(errorMessage, "error");
    },
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };

    fetchBlogs();
  }, [user]);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedBlogappUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      notify(`${user.name} logged in.`, "success");
    } catch (exception) {
      const errorMessage = exception.response
        ? exception.response.data.error
        : "An unexpected error occurred.";
      notify(errorMessage, "error");
    }
  };

  const handleLogout = () => {
    const userName = user.name;
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    blogService.setToken(null);
    notify(`${userName} logged out.`, "success");
  };

  const handleCreateBlog = async (newBlog) => {
    newBlogMutation.mutate(newBlog);
    // close togglable form
    blogFormRef.current.toggleVisibility();
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

      notify(
        `${blog.title} by ${blog.author} now has ${updatedBlog.likes} like${
          updatedBlog.likes !== 1 ? "s" : ""
        }.`,
        "success",
      );
    } catch (exception) {
      const errorMessage = exception.response
        ? exception.response.data.error
        : "An unexpected error occurred.";
      notify(errorMessage, "error");
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

      notify(`${blog.title} by ${blog.author} has been deleted.`, "success");
    } catch (exception) {
      const errorMessage = exception.response
        ? exception.response.data.error
        : "An unexpected error occurred.";
      notify(errorMessage, "error");
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
