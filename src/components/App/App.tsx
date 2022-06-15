import React, { FC, useState } from 'react';
import Actions from '@components/Actions';
import Button from '@components/ui/Button';
import Icon from '@components/ui/Icon';
import Modal from '@components/ui/Modal';
import Header from '../Header';
import InputField from '../Todo/InputField';
import List from '../Todo/List';
import './App.scss';

const App: FC = () => {
  return (
    <div className="app">
      <div className="app__wrapper">
        <Header />
        <Actions />
        <InputField />
        <List />
      </div>
    </div>
  );
};

export default App;
