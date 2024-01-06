import { useState } from "react";

const Header = () => <h1>give feedback</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = () => (total === 0 ? 0 : (good - bad) / total);
  const positivePercentage = () => (total === 0 ? 0 : good * (100 / total));

  return total > 0 ? (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="average" value={average().toFixed(2)} />
          <StatisticsLine
            text="positive"
            value={`${positivePercentage().toFixed(2)} %`}
          />
        </tbody>
      </table>
    </>
  ) : (
    <p>No feedback given</p>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increment = (state, setter) => () => {
    setter(state + 1);
  };

  return (
    <>
      <Header />
      <Button onClick={increment(good, setGood)} text={"good"} />
      <Button onClick={increment(neutral, setNeutral)} text={"neutral"} />
      <Button onClick={increment(bad, setBad)} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
