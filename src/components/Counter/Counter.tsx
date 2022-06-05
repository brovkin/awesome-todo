import React, { FC } from 'react';
import { decrement, increment } from '../../features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const Counter: FC = () => {
  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <div>Counter: {counter}</div>
      <button className="inc" onClick={() => dispatch(increment())}>
        Inc
      </button>
      <button className="dec" onClick={() => dispatch(decrement())}>
        Dec
      </button>
    </>
  );
};

export default Counter;
