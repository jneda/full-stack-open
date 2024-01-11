import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { incrementVotes } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

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
    id: PropTypes.string,
    content: PropTypes.string,
    votes: PropTypes.number,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === "") {
      return anecdotes;
    }
    return anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(incrementVotes(anecdote));
    dispatch(setNotification(`You voted "${anecdote.content}".`));
    setTimeout(() => dispatch(removeNotification()), 5000);
  };

  const sortFunction = (a, b) => b.votes - a.votes;

  return (
    <>
      {anecdotes
        .slice()
        .sort(sortFunction)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => vote(anecdote)}
          />
        ))}
    </>
  );
};

export default AnecdoteList;
