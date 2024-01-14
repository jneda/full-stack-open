import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

let notificationTimerRef = null;

export const notify = (message, type) => (dispatch) => {
  dispatch(setNotification({ message, type }));
  if (notificationTimerRef) {
    clearTimeout(notificationTimerRef);
  }
  notificationTimerRef = setTimeout(() => {
    dispatch(setNotification(null));
  }, 5000);
};

export default notificationSlice.reducer;
