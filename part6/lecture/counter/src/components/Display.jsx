import { useCounterValue } from "../hooks/useCounter";

const Display = () => {
  const counter = useCounterValue();
  return <div>{counter}</div>;
};

export default Display;
