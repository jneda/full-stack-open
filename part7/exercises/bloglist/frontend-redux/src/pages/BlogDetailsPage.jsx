import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateBlog, deleteBlog } from "../reducers/blogReducer";

import BlogDetails from "../components/BlogDetails";
import BlogComments from "../components/BlogComments";

const BlogDetailsPage = ({ blogId }) => {
  const blog = useSelector((state) => {
    if (!blogId) return null;
    return state.blogs.find((blog) => blog.id === blogId);
  });

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateLikes = async (blog) => {
    const update = {
      ...blog,
      comments: blog.comments.map((comment) => comment.id),
      user: blog.user.id,
      likes: blog.likes + 1,
    };

    dispatch(updateBlog(update));
  };

  const handleDeleteBlog = async (blog) => {
    const confirmed = window.confirm(`Delete ${blog.title} by ${blog.author}?`);
    if (!confirmed) return;

    dispatch(deleteBlog(blog));
    navigate("/");
  };

  if (!blog) return null;

  return (
    <>
      <BlogDetails
        blog={blog}
        user={user}
        onLike={handleUpdateLikes}
        onDelete={handleDeleteBlog}
      />
      <BlogComments blog={blog} />
    </>
  );
};

export default BlogDetailsPage;
