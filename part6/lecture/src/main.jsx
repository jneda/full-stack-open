import ReactDOM from "react-dom/client";
import { legacy_createStore as createStore } from "redux";
import noteReducer from "./reducers/noteReducer";

const store = createStore(noteReducer);

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "The app state is in the Redux store",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "State changes are made with actions",
    important: false,
    id: 2,
  },
});

const App = () => (
  <div>
    <ul>
      {store.getState().map((n) => (
        <li key={n.id}>
          {n.content} <strong>{n.important ? "important" : ""}</strong>
        </li>
      ))}
    </ul>
  </div>
);

const root = ReactDOM.createRoot(document.querySelector("#root"));

const renderApp = () => root.render(<App />);

renderApp();
store.subscribe(renderApp);
