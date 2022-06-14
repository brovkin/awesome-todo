import React, { FC } from 'react';
import Header from '../Header';
import InputField from '../Todo/InputField';
import List from '../Todo/List';
import './App.scss';

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
