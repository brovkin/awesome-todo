import React, { FC } from 'react';
import './App.scss';
import Item from '../Todo/Item';

const App: FC = () => {
  return (
    <div className="app">
      <h1>Awesome Todo App</h1>

      <div className="wrapper">
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
};

export default App;
