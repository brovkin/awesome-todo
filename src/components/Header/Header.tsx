import React, { FC, useState } from 'react';
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
          <h1 className="header__title">Awesome Todo App</h1>
        </div>
      </div>

      <ListMenu isOpen={listMenu} />
    </>
  );
};

export default Header;
