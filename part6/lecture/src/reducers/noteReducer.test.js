import noteReducer from "./noteReducer";
import deepFreeze from "deep-freeze";

describe("noteReducer", () => {
  test("returns new state with action NEW_NOTE", () => {
    const state = [];
    const action = {
      type: "NEW_NOTE",
      payload: {
        content: "The app's state is in the Redux store",
        important: true,
        id: 1,
      },
    };

    deepFreeze(state);
    const newState = noteReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.payload);
  });

  test("returns new state with action TOGGLE_IMPORTANCE", () => {
    const state = [
      {
        content: "The app's state is in the Redux store",
        important: true,
        id: 1,
      },
      {
        content: "State changes are made with actions",
        important: false,
        id: 2,
      },
    ];

    const action = {
      type: "TOGGLE_IMPORTANCE",
      payload: { id: 2 },
    };

    deepFreeze(state);
    const newState = noteReducer(state, action);

    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual(state[0]);
    expect(newState).toContainEqual({
      content: "State changes are made with actions",
      important: true,
      id: 2,
    });
  });
});
