import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, updateAnecdote } from "./requests";
import {
  useNotificationDispatch,
  setNotificationMessage,
} from "./hooks/useNotification";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const notify = (message) => {
    notificationDispatch(setNotificationMessage(message));
    setTimeout(
      () => notificationDispatch(setNotificationMessage("")),
      5 * 1000
    );
  };

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,

    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((a) =>
          a.id !== updatedAnecdote.id ? a : updatedAnecdote
        )
      );

      notify(`You just voted "${updatedAnecdote.content}".`);
    },

    onError: (error) => {
      const errorMessage = error.response.data.error;
      notify(`Error: ${errorMessage}.`);
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
  };

  const queryResult = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
  });

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
        <div key={anecdote.id} className="anecdote">
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
