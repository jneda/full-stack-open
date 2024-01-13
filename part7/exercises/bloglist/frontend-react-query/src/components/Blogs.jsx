import PropTypes from "prop-types";
import { useBlogs } from "../hooks/useBlogs";
import Blog from "./Blog";

const Blogs = ({ onLike, user, onDelete }) => {
  const { blogs } = useBlogs();

  const descendingLikesSort = (blogA, blogB) => blogB.likes - blogA.likes;

  return (
    <div data-cy="blogs-list">
      {blogs.data &&
        blogs.data
          .slice()
          .sort(descendingLikesSort)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              onLike={onLike}
              user={user}
              onDelete={onDelete}
            />
          ))}
    </div>
  );
};

Blogs.propTypes = {
  onLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Blogs;
