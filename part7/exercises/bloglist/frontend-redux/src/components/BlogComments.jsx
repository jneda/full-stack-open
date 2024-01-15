import { useDispatch } from "react-redux";
import { createComment } from "../reducers/blogReducer";
import { TextField, Button, Box, List, ListItem, Paper } from "@mui/material";

const BlogComments = ({ blog }) => {
  const dispatch = useDispatch();

  const addComment = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    e.target.content.value = "";

    dispatch(
      createComment({
        content,
        blog: blog.id,
      }),
    );
  };

  return (
    <div>
      <h3 style={{ fontFamily: "Roboto" }}>Comments</h3>
      <form onSubmit={addComment}>
        <Box sx={{ display: "flex", mb: 2 }}>
          <TextField name="content" size="small" />
          <Button type="submit" siwe="small" variant="outlined" sx={{ ml: 1 }}>
            Add comment
          </Button>
        </Box>
      </form>
      <List component={Paper}>
        {blog.comments.map((comment) => (
          <ListItem key={comment.id} style={{ fontFamily: "Roboto" }}>
            {comment.content}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BlogComments;
