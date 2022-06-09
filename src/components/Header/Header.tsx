import React, { FC } from 'react';
import './Header.scss';

const Header: FC = () => {
  return (
    <div className="header__wrapper">
      <h1 className="header__title">Awesome Todo App</h1>
    </div>
  );
};

export default Header;
