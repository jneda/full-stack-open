import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";
import { notify } from "./notificationReducer";

const usersReducer = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersReducer.actions;

export const initializeUsers = () => async (dispatch) => {
  try {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  } catch (error) {
    console.log(error);
    dispatch(
      notify(`${error.response.statusText}: could not fetch users.`, "error"),
    );
  }
};

export default usersReducer.reducer;
