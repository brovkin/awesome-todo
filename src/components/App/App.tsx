import React, { FC } from 'react';
import Actions from '@components/Actions';
import ListModal from '@components/ListModal';
import { CreateListProvider } from '@context/CreateListContext';
import Header from '../Header';
import ItemsList from '../Todo/ItemsList';
import './App.scss';

const App: FC = () => {
  return (
    <div className="app">
      <div className="app-wrapper">
        <CreateListProvider>
          <Header />
          <Actions />
          <div className="app-content">
            <div className="main-container">
              <ItemsList />
            </div>
          </div>
          <ListModal />
        </CreateListProvider>
        {/*<ListModal isOpen={listModal} onClose={() => setListModal(false)} />*/}
      </div>
    </div>
  );
};

export default App;
