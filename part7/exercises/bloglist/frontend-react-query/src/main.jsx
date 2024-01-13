import ReactDOM from "react-dom/client";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContextProvider>
    <App />
  </NotificationContextProvider>,
);
