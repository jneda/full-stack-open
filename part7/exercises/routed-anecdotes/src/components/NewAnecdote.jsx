import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useField } from "../hooks";

const NewAnecdote = ({ addNew, onAdd }) => {
  const { reset: contentReset, ...contentField } = useField("text");
  const { reset: authorReset, ...authorField } = useField("text");
  const { reset: infoReset, ...infoField } = useField("text");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const content = contentField.value;
    e.preventDefault();
    addNew({
      content: content,
      author: authorField.value,
      info: infoField.value,
      votes: 0,
    });
    onAdd(`New anecdote "${content}" created.`);
    navigate("/");
  };

  const resetForm = () => {
    contentReset();
    authorReset();
    infoReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentField} />
        </div>
        <div>
          author
          <input {...authorField} />
        </div>
        <div>
          url for more info
          <input {...infoField} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={resetForm}>
          reset
        </button>
      </form>
    </div>
  );
};

NewAnecdote.propTypes = {
  addNew: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default NewAnecdote;
