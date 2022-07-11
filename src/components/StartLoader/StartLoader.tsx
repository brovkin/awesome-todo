import React, { FC, useEffect, useState } from 'react';
import Icon from '@components/ui/Icon';
import { getSessionStorage } from '@utils/sessionStorage';
import { SESSION_STORAGE_NAME } from '@constants';
import './StartLoader.scss';

const TIMEOUT = 3500;

interface StartLoaderProps {
  children: JSX.Element;
}

const StartLoader: FC<StartLoaderProps> = ({ children }) => {
  const storage = getSessionStorage();
  const preloader = storage ? JSON.parse(storage).preloader : true;
  const [loading, setLoading] = useState<boolean>(preloader);

  useEffect(() => {
    (() =>
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem(
          SESSION_STORAGE_NAME,
          JSON.stringify({ preloader: false })
        );
      }, TIMEOUT))();
  }, []);

  if (!loading) {
    return children;
  }

  return (
    <div className="start-loader">
      <div className="start-loader__wrapper">
        <div className="start-loader__content">
          <Icon type="cup" className="start-loader__content-icon" />
          <div className="start-loader__content-title">Awesome Todo App</div>
        </div>
      </div>
    </div>
  );
};

export default StartLoader;
