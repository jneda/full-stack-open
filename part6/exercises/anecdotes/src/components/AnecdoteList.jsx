import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { incrementVotes } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    votes: PropTypes.number,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(incrementVotes(id));
  };

  const sortFunction = (a, b) => b.votes - a.votes;

  return (
    <>
      {anecdotes.sort(sortFunction).map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id)}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
