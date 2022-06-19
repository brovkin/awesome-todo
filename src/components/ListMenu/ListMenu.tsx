import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import Lists from '@components/Todo/Lists';
import './ListMenu.scss';

interface ListMenuProps {
  isOpen: boolean;
}

const ListMenu: FC<ListMenuProps> = ({ isOpen }) => {
  return (
    <CSSTransition in={isOpen} timeout={100} classNames="list-menu-animation">
      <div className={cn('list-menu app-container', { active: isOpen })}>
        <Lists />
      </div>
    </CSSTransition>
  );
};

export default ListMenu;
