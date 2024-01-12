import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const NewAnecdote = ({ addNew, onAdd }) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content,
      author,
      info,
      votes: 0,
    });
    onAdd(`New anecdote "${content}" created.`);
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

NewAnecdote.propTypes = {
  addNew: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default NewAnecdote;
