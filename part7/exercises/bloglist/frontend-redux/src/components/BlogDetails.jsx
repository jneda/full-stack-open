const BlogDetails = ({ blog, user, onLike, onDelete }) => {
  return (
    <div className="blogDetails" data-cy="blog-details">
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div className="like">
        <span data-cy="blog-likes">
          {blog.likes} like{blog.likes !== 1 ? "s" : ""}
        </span>
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

export default BlogDetails;
