const initialState = [
  {
    content: "Reducer defines how Redux store works",
    important: true,
    id: 1,
  },
  {
    content: "State of store can contain any data",
    important: false,
    id: 2,
  },
];

const generateId = () => Number((Math.random() * 1000 * 1000).toFixed(0));

export const createNote = (content) => ({
  type: "NEW_NOTE",
  payload: {
    content,
    important: false,
    id: generateId(),
  },
});

export const toggleImportanceOf = (id) => ({
  type: "TOGGLE_IMPORTANCE",
  payload: { id },
});

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.payload];

    case "TOGGLE_IMPORTANCE": {
      const id = action.payload.id;
      const noteToChange = state.find((n) => n.id === id);

      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };

      return state.map((n) => (n.id !== id ? n : changedNote));
    }

    default:
      return state;
  }
};

export default noteReducer;
