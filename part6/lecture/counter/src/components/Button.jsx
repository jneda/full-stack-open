/* eslint-disable react/prop-types */
import { useCounterDispatch } from "../hooks/useCounter";

const Button = ({ type, label }) => {
  const dispatch = useCounterDispatch();
  return <button onClick={() => dispatch({ type })}>{label}</button>;
};

export default Button;
