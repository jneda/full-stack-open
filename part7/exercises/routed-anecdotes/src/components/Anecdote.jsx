import PropTypes from "prop-types";

const Anecdote = ({ anecdote }) => {
  const { content, author, votes, info } = anecdote;
  return (
    <>
      <h2>
        {content} by {author}
      </h2>
      <p>
        Has {votes} vote{votes !== 1 ? "s" : ""}
      </p>
      <p>
        For more info see <a href={info}>{info}</a>
      </p>
    </>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    i: PropTypes.number,
    content: PropTypes.string,
    author: PropTypes.string,
    info: PropTypes.string,
    votes: PropTypes.number,
  }),
};

export default Anecdote;
