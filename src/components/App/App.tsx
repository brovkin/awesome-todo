import React, { ChangeEvent, FC, useState } from 'react';
import './App.scss';

const App: FC = () => {
  const [text, setText] = useState<string>('Текст');
  const [clickTimes, setClickTimes] = useState<number>(0);

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
    </div>
  );
};

export default App;
