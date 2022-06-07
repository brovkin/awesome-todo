import React, { FC } from 'react';
import './App.scss';
import Item from '../Todo/Item';
import InputField from '../Todo/InputField';
import List from '../Todo/List';

const App: FC = () => {
  return (
    <div className="app">
      <h1>Awesome Todo App</h1>

      <div className="wrapper">
        <InputField />
        <List />
        {/*<Item />*/}
        {/*<Item />*/}
        {/*<Item />*/}
      </div>
    </div>
  );
};

export default App;
