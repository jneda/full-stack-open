import { useSelector } from "react-redux";

const BlogDetailsPage = ({ blogId }) => {
  const blog = useSelector((state) => {
    if (!blogId) return null;
    return state.blogs.find((blog) => blog.id === blogId);
  });

  if (!blog) return null;

  return (
    <>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <a href={blog.info}>{blog.info}</a>
      <div>
        <p>{blog.likes} likes</p>
        <button>Like</button>
      </div>
      <div>
        <p>Added by {blog.user.name}</p>
      </div>
    </>
  );
};

export default BlogDetailsPage;
