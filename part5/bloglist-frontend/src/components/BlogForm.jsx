const BlogForm = ({
  title,
  onTitleChange,
  author,
  onAuthorChange,
  url,
  onUrlChange,
  createBlog,
}) => {
  return (
    <>
      <h2>Add new blog</h2>
      <form onSubmit={createBlog}>
        <div>
          Title:{" "}
          <input
            type="text"
            name="title"
            value={title}
            onChange={onTitleChange}
          />
        </div>
        <div>
          Author:{" "}
          <input
            type="text"
            name="author"
            value={author}
            onChange={onAuthorChange}
          />
        </div>
        <div>
          Url:
          <input type="text" name="url" value={url} onChange={onUrlChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default BlogForm;
