import Blog from "./Blog";

const Blogs = ({ blogs, onLike, user, onDelete }) => {
  const descendingLikesSort = (blogA, blogB) => blogB.likes - blogA.likes;

  return (
    <div>
      {blogs.sort(descendingLikesSort).map((blog) => (
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

export default Blogs;
