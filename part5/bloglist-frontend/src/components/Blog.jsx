import PropTypes from "prop-types";
import { useState } from "react";

const Blog = ({ blog, onLike, user, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const detailsVisibile = { display: showDetails ? "" : "none" };

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div className="blog">
      <div className="blogEntry">
        {blog.title}
        <span className="author"> - {blog.author}</span>
        <button onClick={toggleDetails}>{showDetails ? "Hide" : "View"}</button>
        {user && user.id === blog.user.id ? (
          <button onClick={() => onDelete(blog)}>Delete</button>
        ) : null}
      </div>
      <div className="blogDetails" style={detailsVisibile}>
        <span>{blog.url}</span>
        <div className="like">
          <span>Likes: {blog.likes}</span>
          <button onClick={() => onLike(blog)}>Like</button>
        </div>
        <span>{blog.user.name}</span>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  onLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Blog;
