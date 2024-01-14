import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateBlog, deleteBlog } from "../reducers/blogReducer";

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
    <div className="blogDetails" data-cy="blog-details">
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <a href={blog.info}>{blog.info}</a>
      <div className="like">
        <span data-cy="blog-likes">
          {blog.likes} like{blog.likes !== 1 ? "s" : ""}
        </span>
        <button onClick={() => handleUpdateLikes(blog)} data-cy="blog-like-btn">
          Like
        </button>
      </div>
      <div>
        <span>Added by {blog.user.name}</span>
        {user && user.id === blog.user?.id ? (
          <button
            onClick={() => handleDeleteBlog(blog)}
            data-cy="delete-blog-btn"
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default BlogDetailsPage;
