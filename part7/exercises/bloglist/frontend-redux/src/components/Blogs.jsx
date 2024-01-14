import { useSelector } from "react-redux";
import BlogLink from "./BlogLink";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const descendingLikesSort = (blogA, blogB) => blogB.likes - blogA.likes;

  return (
    <div data-cy="blogs-list">
      {blogs
        .slice()
        .sort(descendingLikesSort)
        .map((blog) => (
          <BlogLink key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  );
};

export default Blogs;
