import React, { FC } from 'react';
import Actions from '@components/Actions';
import ListModal from '@components/ListModal';
import StartLoader from '@components/StartLoader';
import Welcome from '@components/Welcome';
import { useAppSelector } from '@app/hooks';
import { CreateListProvider } from '@context/CreateListContext';
import { NotificationProvider } from '@context/NotificationContext';
import { getSettings } from '@selectors/settings';
import Header from '../Header';
import ItemsList from '../Todo/ItemsList';
import './App.scss';

const App: FC = () => {
  const { isAuth } = useAppSelector(getSettings);

  return (
    <div className="app">
      <div className="app-wrapper">
        <StartLoader>
          {isAuth ? (
            <NotificationProvider>
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
            </NotificationProvider>
          ) : (
            <Welcome />
          )}
        </StartLoader>
      </div>
    </div>
  );
};

export default App;
