import { useState } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";
import { ALL_PERSONS } from "./queries";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const client = useApolloClient();
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      console.log("Timeout elapsed");
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </>
    );
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>Logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export default App;
