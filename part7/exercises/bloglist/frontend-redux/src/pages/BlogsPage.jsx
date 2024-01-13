import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";
import Blogs from "../components/Blogs";

const BlogsPage = ({
  blogFormRef,
  handleCreateBlog,
  handleUpdateLikes,
  handleDeleteBlog,
}) => (
  <>
    <Togglable buttonLabel="Add a blog" ref={blogFormRef}>
      <h2>Add new blog</h2>
      <BlogForm createBlog={handleCreateBlog} />
    </Togglable>
    <Blogs onLike={handleUpdateLikes} onDelete={handleDeleteBlog} />
  </>
);

export default BlogsPage;
