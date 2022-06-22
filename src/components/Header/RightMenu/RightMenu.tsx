import React, { FC, useRef, useState } from 'react';
import Info from '@components/Header/RightMenu/Info';
import Icon from '@components/ui/Icon';
import useOnClickOutside from '@hooks/useClickOutside';
import './RightMenu.scss';

const RightMenu: FC = () => {
  const [rightMenu, setRightMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(menuRef, () => setRightMenu(false));

  const handleClick = () => {
    setRightMenu((prev) => !prev);
  };

  return (
    <div className="right-menu" ref={menuRef}>
      <Icon
        className="right-menu__icon"
        type="profile"
        clickHandler={handleClick}
      />

      {rightMenu ? (
        <div className="right-menu__modal">
          <div className="right-menu__modal-wrapper">
            <Info />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RightMenu;
