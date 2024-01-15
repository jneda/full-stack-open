import { Button, Link as MuiLink } from "@mui/material";

const BlogDetails = ({ blog, user, onLike, onDelete }) => {
  return (
    <div
      className="blogDetails"
      data-cy="blog-details"
      style={{ fontFamily: "Roboto" }}
    >
      <h2 style={{ fontFamily: "Roboto" }}>
        {blog.title} - {blog.author}
      </h2>
      <MuiLink
        href={blog.url}
        style={{ display: "block", marginBottom: "1rem" }}
      >
        {blog.url}
      </MuiLink>
      <div className="like" style={{ display: "block", marginBottom: "1rem" }}>
        <span data-cy="blog-likes">
          {blog.likes} like{blog.likes !== 1 ? "s" : ""}
        </span>
        <Button
          onClick={() => onLike(blog)}
          data-cy="blog-like-btn"
          variant="outlined"
          sx={{ ml: 1 }}
        >
          Like
        </Button>
      </div>
      <div>
        <span>Added by {blog.user.name}</span>
        {user && user.id === blog.user?.id ? (
          <Button
            onClick={() => onDelete(blog)}
            data-cy="delete-blog-btn"
            variant="outlined"
            sx={{ ml: 1 }}
          >
            Delete
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default BlogDetails;
