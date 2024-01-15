import { useState } from "react";
import PropTypes from "prop-types";

import { Box, TextField, Button } from "@mui/material";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <Box component="form" onSubmit={addBlog} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Title"
        name="title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        data-cy="title-input"
        id="title-input"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Author"
        name="author"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        data-cy="author-input"
        id="author-input"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Url"
        name="url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        data-cy="url-input"
        id="url-input"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        data-cy="blog-form-submit"
      >
        Add
      </Button>
    </Box>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
