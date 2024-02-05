import { useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import Notify from "./components/Notify";

import { GenresFilterProvider } from "./contexts/GenresFilterContext";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";
import { updateCache } from "./helpers";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const {
        data: { bookAdded },
      } = data;
      notify({
        type: "success",
        message: `${bookAdded.title} by ${bookAdded.author.name} has been added.`,
      });
      updateCache(client.cache, { query: ALL_BOOKS }, bookAdded);
    },
  });

  const notify = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <Notify {...message} />
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        {token && (
          <>
            <button onClick={() => setPage("add")}>Add book</button>
            <button onClick={() => setPage("recommend")}>Recommend</button>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {!token && <button onClick={() => setPage("login")}>Login</button>}
      </div>

      <Authors show={page === "authors"} />

      <GenresFilterProvider>
        <Books show={page === "books"} />

        <NewBook show={page === "add"} />
      </GenresFilterProvider>

      <Recommendations show={page === "recommend"} />

      <LoginForm show={page === "login"} setToken={setToken} />
    </div>
  );
};

export default App;
