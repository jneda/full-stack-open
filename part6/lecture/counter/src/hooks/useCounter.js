import { useContext } from 'react';
import { CounterContext } from '../CounterContext';

export const useCounterValue = () => {
  const [counter] = useContext(CounterContext);
  return counter;
};

export const useCounterDispatch = () => {
  const [, dispatch] = useContext(CounterContext);
  return dispatch;
};