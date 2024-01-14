import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Blog = ({ blog, user, onDelete }) => {
  return (
    <div className="blog" data-cy="blog-item">
      <div className="blogEntry">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title}
          <span className="author"> - {blog.author}</span>
        </Link>
        
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Blog;
