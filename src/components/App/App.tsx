import React, { FC } from 'react';
import Button from '@components/ui/Button';
import Icon from '@components/ui/Icon';
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
        <div>
          <h2>Создать новый лист</h2>
          <Button
            clickHandler={() => console.log('test')}
            type="icon"
            icon={<Icon type="plus" />}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
