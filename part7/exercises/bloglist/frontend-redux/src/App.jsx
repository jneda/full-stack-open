import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";

import blogService from "./services/blogs";

import { initializeBlogs, createBlog } from "./reducers/blogReducer";

import { setUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";

import Navigation from "./components/Navigation";
import Notification from "./components/Notification";
import Login from "./components/Login";

import BlogsPage from "./pages/BlogsPage";
import UsersPage from "./pages/UsersPage";
import UserPage from "./pages/UserPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const userIdMatch = useMatch("/users/:id");
  let userId = null;
  if (userIdMatch) {
    userId = userIdMatch.params.id;
  }

  const blogIdMatch = useMatch("/blogs/:id");
  let blogId = null;
  if (blogIdMatch) {
    blogId = blogIdMatch.params.id;
  }

  useEffect(() => {
    const fetchBlogs = async () => dispatch(initializeBlogs());

    fetchBlogs();
  }, [user, dispatch]);

  useEffect(() => {
    const fetchUsers = async () => dispatch(initializeUsers());

    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedBlogappUser");
    if (storedUser && !user) {
      const user = JSON.parse(storedUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [user, dispatch]);

  const handleCreateBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();

    dispatch(createBlog(newBlog));
  };

  return (
    <>
      <Navigation />
      <h1>Blogs</h1>
      <Notification />

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <BlogsPage
                blogFormRef={blogFormRef}
                handleCreateBlog={handleCreateBlog}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserPage userId={userId} />} />
        <Route path="blogs/:id" element={<BlogDetailsPage blogId={blogId} />} />
      </Routes>
    </>
  );
};

export default App;
