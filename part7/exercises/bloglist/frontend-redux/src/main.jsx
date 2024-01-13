import { Provider as StoreProvider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";

import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
);
