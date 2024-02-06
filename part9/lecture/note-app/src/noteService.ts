import { Note, NewNote } from "./types";

const baseUrl = "http://localhost:3001/notes";

export const getAllNotes = async () => {
  const response = await fetch(baseUrl);
  const notes: Note[] = await response.json();
  return notes;
};

export const createNote = async (newNote: NewNote) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(newNote),
  });
  const addedNote: Note = await response.json();
  return addedNote;
};
