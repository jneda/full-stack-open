import { useSelector } from "react-redux";

const BlogDetailsPage = ({ blogId, onLike, onDelete }) => {
  const blog = useSelector((state) => {
    if (!blogId) return null;
    return state.blogs.find((blog) => blog.id === blogId);
  });

  const user = useSelector((state) => state.user);

  if (!blog) return null;

  return (
    <div className="blogDetails">
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <a href={blog.info}>{blog.info}</a>
      <div className="like">
        <span data-cy="blog-likes">{blog.likes} likes</span>
        <button onClick={() => onLike(blog)} data-cy="blog-like-btn">
          Like
        </button>
      </div>
      <div>
        <span>Added by {blog.user.name}</span>
        {user && user.id === blog.user?.id ? (
          <button onClick={() => onDelete(blog)} data-cy="delete-blog-btn">
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default BlogDetailsPage;
