import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CounterContextProvider } from "./CounterContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
);
