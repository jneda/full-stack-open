import React, { useState } from "react";
import { Note } from "./types";

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([{ id: 1, content: "Testing" }]);

  const createNote = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const noteToAdd = {
      content: newNote,
      id: notes.length + 1,
    };
    setNotes(notes.concat(noteToAdd));
    setNewNote("");
  };

  return (
    <div>
      <form onSubmit={createNote}>
        <input
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
