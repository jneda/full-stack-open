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
import {
  Container,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TextField,
  Button,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";

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
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>{note.user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
          <TextField label="Username" />
        </div>
        <div>
          <TextField label="Password" type="password" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </div>
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
  const [message, setMessage] = useState(null);

  const login = (user) => {
    setUser(user);
    setMessage(`Welcome, ${user}.`);
    setTimeout(() => setMessage(null), 5000);
  };

  const padding = {
    padding: 5,
  };

  const match = useMatch("/notes/:id");
  const note = match
    ? notes.find((n) => n.id === parseInt(match.params.id))
    : null;

  return (
    <Container>
      <div>{message && <Alert severity="success">{message}</Alert>}</div>

      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/notes">
            Notes
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          {user ? (
            <em>{user} logged in</em>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

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

      <footer>
        <br />
        <em>Note app, Department of Computer Science 2024</em>
      </footer>
    </Container>
  );
};

export default App;
