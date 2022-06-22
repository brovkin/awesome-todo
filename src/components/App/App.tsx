import React, { FC } from 'react';
import Actions from '@components/Actions';
import Header from '../Header';
import ItemsList from '../Todo/ItemsList';
import './App.scss';

const App: FC = () => {
  return (
    <div className="app">
      <div className="app-wrapper">
        <Header />
        <Actions />
        <div className="app-content">
          <div className="main-container">
            <ItemsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
