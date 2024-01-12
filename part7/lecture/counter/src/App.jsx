import { useState } from "react";

const useCounter = () => {
  const [value, setValue] = useState(0);

  const increase = () => setValue(value + 1);

  const decrease = () => setValue(value - 1);

  const zero = () => setValue(0);

  return { value, increase, decrease, zero };
};

const App = () => {
  const counter = useCounter();
  const left = useCounter();
  const right = useCounter();

  return (
    <>
      <div>
        <div>{counter.value}</div>
        <button onClick={counter.increase}>Plus</button>
        <button onClick={counter.decrease}>Minus</button>
        <button onClick={counter.zero}>Zero</button>
      </div>
      <div>
        {left.value}
        <button onClick={left.increase}>Left</button>
        <button onClick={right.increase}>Right</button>
        {right.value}
      </div>
    </>
  );
};

export default App;
