import { useState } from "react";

const Anecdote = ({ title, anecdote, points }) => {
  return (
    <>
      <h1>{title}</h1>
      <div>{anecdote}</div>
      <div>
        has {points} vote{points > 1 ? "s" : ""}
      </div>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const initialPoints = Array.from({ length: anecdotes.length }, () => 0);

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(initialPoints);

  const addPoint = () => {
    const newPoints = [...points];
    newPoints[selected]++;
    setPoints(newPoints);
  };

  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const mostVoted = () => {
    let max = 0;
    let mostVoted = -1;
    
    points.forEach((val, idx) => {
      if (val <= max) return;

      max = val;
      mostVoted = idx;
    });

    return mostVoted;
  };

  return (
    <>
      <Anecdote
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        points={points[selected]}
      />
      <button onClick={addPoint}>vote</button>
      <button onClick={getRandomAnecdote}>next anecdote</button>
      {mostVoted() !== -1 ? (
        <Anecdote
          title="Anecdote with most votes"
          anecdote={anecdotes[mostVoted()]}
          points={points[mostVoted()]}
        />
      ) : null}
    </>
  );
};

export default App;
