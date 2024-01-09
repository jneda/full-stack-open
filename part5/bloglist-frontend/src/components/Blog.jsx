import { useState } from "react";

const Blog = ({ blog, onLike }) => {
  const [showDetails, setShowDetails] = useState(false);

  const detailsVisibile = { display: showDetails ? "" : "none" };

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div className="blog">
      <div className="blogEntry">
        {blog.title}
        <span className="author"> - {blog.author}</span>
        <button onClick={toggleDetails}>{showDetails ? "Hide" : "View"}</button>
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

export default Blog;
