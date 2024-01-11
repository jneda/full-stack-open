import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },

    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.create(content);
  dispatch(appendAnecdote(newAnecdote));
};

export const incrementVotes =
  ({ id, content, votes }) =>
  async (dispatch, getState) => {
    const update = {
      content,
      votes: votes + 1,
    };

    const updatedAnecdote = await anecdoteService.update(id, update);

    dispatch(
      setAnecdotes(
        getState().anecdotes.map((a) => (a.id !== id ? a : updatedAnecdote))
      )
    );
  };

export default anecdoteSlice.reducer;
