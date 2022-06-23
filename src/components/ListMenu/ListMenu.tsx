import React, { FC, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import Lists from '@components/Todo/Lists';
import Button from '@components/ui/Button';
import { CreateListContext } from '@context/CreateListContext';
import './ListMenu.scss';

interface ListMenuProps {
  isOpen: boolean;
}

const ListMenu: FC<ListMenuProps> = ({ isOpen }) => {
  const { setListModal } = useContext(CreateListContext) as CreateListContext;

  return (
    <CSSTransition in={isOpen} timeout={100} classNames="list-menu-animation">
      <div className={cn('list-menu app-container', { active: isOpen })}>
        <Button clickHandler={() => setListModal(true)}>Новый лист</Button>
        <Lists />
      </div>
    </CSSTransition>
  );
};

export default ListMenu;
