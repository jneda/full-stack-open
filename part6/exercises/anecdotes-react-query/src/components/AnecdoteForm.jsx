import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import {
  useNotificationDispatch,
  setNotificationMessage,
} from "../hooks/useNotification";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const notify = (message) => {
    notificationDispatch(setNotificationMessage(message));
    setTimeout(
      () => notificationDispatch(setNotificationMessage("")),
      5 * 1000
    );
  };

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,

    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));

      notify(`You just added "${newAnecdote.content}".`);
    },

    onError: (error) => {
      const errorMessage = error.response.data.error;
      notify(`Error: ${errorMessage}.`);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
