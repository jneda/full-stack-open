import React, { useState, useEffect } from "react";
import { Note } from "./types";
import { getAllNotes, createNote } from "./noteService";

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([{ id: 1, content: "Testing" }]);

  useEffect(() => {
    const fetchNotes = async () => {
      const notes: Note[] = await getAllNotes();
      setNotes(notes);
    };

    fetchNotes();
  }, []);

  const addNote = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const addedNote = await createNote({ content: newNote });
    setNotes(notes.concat(addedNote));
    setNewNote("");
  };

  return (
    <div>
      <form onSubmit={addNote}>
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
