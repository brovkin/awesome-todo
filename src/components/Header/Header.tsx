import React, { FC, useState } from 'react';
import RightMenu from '@components/Header/RightMenu';
import ListMenu from '@components/ListMenu';
import Icon from '@components/ui/Icon';
import './Header.scss';

const Header: FC = () => {
  const [listMenu, setListMenu] = useState<boolean>(false);
  return (
    <>
      <div className="header">
        <div className="header__wrapper app-container">
          <div className="header__menu">
            <Icon
              className="header__menu-icon"
              type="menu"
              clickHandler={() => setListMenu((prev) => !prev)}
            />
          </div>
          <h1 className="header__title">
            <a className="header__title-link" href="/">
              Awesome Todo App
            </a>
          </h1>
          <RightMenu />
        </div>
      </div>

      <ListMenu isOpen={listMenu} />
    </>
  );
};

export default Header;
