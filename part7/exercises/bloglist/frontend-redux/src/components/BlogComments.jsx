import { useDispatch } from "react-redux";
import { createComment } from "../reducers/blogReducer";

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
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <span>
          <input name="content" />
          <button type="submit" style={{ display: "inline-block" }}>
            Add comment
          </button>
        </span>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogComments;
