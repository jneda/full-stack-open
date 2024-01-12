/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  background: bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25rem 1rem;
  border: 2px solid chocolate;
  border-radius: 3px;
`;

const Input = styled.input`
  margin: 0.25rem;
`;

const Page = styled.div`
  padding: 1rem;
  background: papayawhip;
`;

const Navigation = styled.div`
  background: burlywood;
  padding: 1rem;
`;

const Footer = styled.div`
  background: chocolate;
  padding: 1rem;
  margin-top: 1rem;
`;

const Home = () => (
  <div>
    <h1>TKTL notes app</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est voluptatum
      in asperiores qui, earum blanditiis eligendi incidunt odio, reiciendis
      animi architecto facilis error nam, hic minima ullam magni mollitia quod!
    </p>
  </div>
);

const Note = ({ note }) => {
  return (
    <div>
      <h1>{note.content}</h1>
      <div>{note.user}</div>
      <div>
        <strong>{note.important ? "important" : ""}</strong>
      </div>
    </div>
  );
};

const Notes = ({ notes }) => (
  <div>
    <h1>Notes</h1>
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Users = () => (
  <div>
    <h1>THTL notes app</h1>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
);

const Login = (props) => {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin("mluukkai");
    navigate("/");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          Username: <Input />
        </div>
        <div>
          Password: <Input type="password" />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

const App = () => {
  const [notes] = useState([
    {
      id: 1,
      content: "HTML is easy",
      important: true,
      user: "Matti Luukkainen",
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
      user: "Matti Luukkainen",
    },
    {
      id: 3,
      content: "Most important methods of HTTP-protocol are GET and POST",
      important: true,
      user: "Arto Hellas",
    },
  ]);

  const [user, setUser] = useState(null);

  const login = (user) => setUser(user);

  const padding = {
    padding: 5,
  };

  const match = useMatch("/notes/:id");
  const note = match
    ? notes.find((n) => n.id === parseInt(match.params.id))
    : null;

  return (
    <Page>
      <Navigation>
        <Link style={padding} to="/">
          Home
        </Link>
        <Link style={padding} to="/notes">
          Notes
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to="/login">
            Login
          </Link>
        )}
      </Navigation>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer>
        <br />
        <em>Note app, Department of Computer Science 2024</em>
      </Footer>
    </Page>
  );
};

export default App;
