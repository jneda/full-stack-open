import { useQuery } from "@tanstack/react-query";
import { getAll } from "./requests";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const queryResult = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
  });

  console.log(JSON.parse(JSON.stringify(queryResult)));

  if (queryResult.isLoading) {
    return <div>Loading...</div>;
  }

  if (queryResult.isError) {
    return (
      <div>{`Anecdote service not available: ${queryResult.error.message}`}</div>
    );
  }

  const anecdotes = queryResult.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
