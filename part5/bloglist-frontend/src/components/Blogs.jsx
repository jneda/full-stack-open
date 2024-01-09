import Blog from "./Blog";

const Blogs = ({ blogs, onLike }) => {
  const descendingLikesSort = (blogA, blogB) => blogB.likes - blogA.likes;

  return (
    <div>
      {blogs.sort(descendingLikesSort).map((blog) => (
        <Blog key={blog.id} blog={blog} onLike={onLike} />
      ))}
    </div>
  );
};

export default Blogs;
