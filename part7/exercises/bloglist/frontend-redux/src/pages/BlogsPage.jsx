import { useRef } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";
import Blogs from "../components/Blogs";

const BlogsPage = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const handleCreateBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();

    dispatch(createBlog(newBlog));
  };

  return (
    <>
      <Togglable buttonLabel="Add a blog" ref={blogFormRef}>
        <h2>Add new blog</h2>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      <Blogs />
    </>
  );
};

export default BlogsPage;
