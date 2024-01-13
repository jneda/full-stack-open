import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import blogService from "../services/blogs";
import Blog from "./Blog";

const Blogs = ({ onLike, user, onDelete }) => {
  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
  const descendingLikesSort = (blogA, blogB) => blogB.likes - blogA.likes;

  return (
    <div data-cy="blogs-list">
      {blogs &&
        blogs
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
