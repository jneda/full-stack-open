import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BlogLink = ({ blog }) => {
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

BlogLink.propTypes = {
  blog: PropTypes.object,
};

export default BlogLink;
