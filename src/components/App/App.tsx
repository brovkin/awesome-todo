import React, { ChangeEvent, FC, useState } from 'react';
import './App.scss';
import { increment, decrement } from '../../features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const App: FC = () => {
  const [text, setText] = useState<string>('Текст');
  const [clickTimes, setClickTimes] = useState<number>(0);

  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    console.log('Click!');
    setClickTimes((prev) => prev + 1);
  };

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
  };

  return (
    <div className="welcome-block">
      <h1>Welcome, guys :)</h1>
      <div className="button-block">
        <p className="text-field">{text}</p>
        <input type="text" onChange={handleText} value={text} />
        <p>Click times: {clickTimes}</p>
        <button onClick={handleClick}>Click me + 1</button>
      </div>

      <div className="state-block">
        <div>Counter: {counter}</div>
        <button onClick={() => dispatch(increment())}>Inc</button>
        <button onClick={() => dispatch(decrement())}>Dec</button>
      </div>
    </div>
  );
};

export default App;
