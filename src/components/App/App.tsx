import React, { FC } from 'react';
import './App.scss';
import InputField from '../Todo/InputField';
import List from '../Todo/List';
import Header from '../Header';

const App: FC = () => {
  return (
    <div className="app">
      <div className="app__wrapper">
        <Header />
        <InputField />
        <List />
      </div>
    </div>
  );
};

export default App;
