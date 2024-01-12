import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const response = await axios(baseUrl);
  return response.data;
};

export const createAnecdote = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

export const updateAnecdote = async (updatedAnecdote) => {
  const response = await axios.put(
    `${baseUrl}/${updatedAnecdote.id}`,
    updatedAnecdote
  );
  return response.data;
};
