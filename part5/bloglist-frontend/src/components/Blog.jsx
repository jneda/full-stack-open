const Blog = ({ blog }) => (
  <div className="blog">
    {blog.title}<span className="author"> - {blog.author}</span>
  </div>  
)

export default Blog