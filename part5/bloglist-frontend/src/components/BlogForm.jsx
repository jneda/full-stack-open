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
      <form onSubmit={createBlog}>
        <div>
          <span>Title: </span>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onTitleChange}
          />
        </div>
        <div>
          <span>Author: </span>
          <input
            type="text"
            name="author"
            value={author}
            onChange={onAuthorChange}
          />
        </div>
        <div>
          <span>Url:</span>
          <input type="text" name="url" value={url} onChange={onUrlChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default BlogForm;
