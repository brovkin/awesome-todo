import React, { FC } from 'react';
import Icon from '@components/ui/Icon';
import './RightMenu.scss';

const RightMenu: FC = () => {
  return (
    <div className="right-menu">
      <Icon className="right-menu__icon" type="plus" />
      <Icon className="right-menu__icon" type="settings" />
    </div>
  );
};

export default RightMenu;
