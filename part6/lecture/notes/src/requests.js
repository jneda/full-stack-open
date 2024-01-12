import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

export const getNotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createNote = async (note) => {
  const response = await axios.post(baseUrl, note);
  return response.data;
};

export const updateNote = async (updatedNote) => {
  const response = await axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote);
  return response.data;
};
