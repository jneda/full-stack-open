import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { GenresFilterProvider } from "./contexts/GenresFilterContext";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
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
