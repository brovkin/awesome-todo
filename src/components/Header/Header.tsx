import React, { FC, useEffect, useState } from 'react';
import GithubBadge from '@components/Header/GithubBadge';
import RightMenu from '@components/Header/RightMenu';
import ListMenu from '@components/ListMenu';
import Icon from '@components/ui/Icon';
import { useAppSelector } from '@app/hooks';
import useMedia from '@hooks/useMedia';
import { getSettings } from '@selectors/settings';
import { IS_PROD, MEDIA_QUERIES, SITE_URL } from '@constants';
import './Header.scss';

const Header: FC = () => {
  const { savePositionListMenu } = useAppSelector(getSettings);
  const isMediaMD = useMedia(MEDIA_QUERIES.md);
  const showListMenuDefault = !isMediaMD && savePositionListMenu;
  const [listMenu, setListMenu] = useState<boolean>(showListMenuDefault);

  useEffect(() => {
    setListMenu(showListMenuDefault);
  }, [savePositionListMenu]);

  const modalHandler = () => {
    setListMenu((prev) => !prev);
  };

  return (
    <>
      <div className="header">
        <div className="header__wrapper app-container">
          <div className="header__menu">
            <Icon
              className="header__menu-icon"
              type="menu"
              clickHandler={modalHandler}
            />
          </div>
          <h1 className="header__title">
            <a className="header__title-link" href={IS_PROD ? SITE_URL : '/'}>
              Awesome Todo App
            </a>
            <GithubBadge />
          </h1>
          <RightMenu />
        </div>
      </div>

      <ListMenu isOpen={listMenu} onClose={() => setListMenu(false)} />
    </>
  );
};

export default Header;
