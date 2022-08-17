import React, { FC, useContext, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import Lists from '@components/Todo/Lists';
import Button from '@components/ui/Button';
import useOnClickOutside from '@hooks/useClickOutside';
import useMedia from '@hooks/useMedia';
import { CreateListContext } from '@context/CreateListContext';
import { MEDIA_QUERIES } from '@constants';
import './ListMenu.scss';

interface ListMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const ListMenu: FC<ListMenuProps> = ({ isOpen, onClose }) => {
  const { setListModal } = useContext(CreateListContext) as CreateListContext;
  const isMediaMD = useMedia(MEDIA_QUERIES.md);

  return (
    <CSSTransition in={isOpen} timeout={100} classNames="list-menu-animation">
      <div
        className={cn('list-menu-wrapper', {
          active: isOpen,
          md: isMediaMD,
        })}
      >
        <div
          className={cn('list-menu app-container', {
            active: isOpen,
          })}
        >
          <Button
            className="list-menu__create-list-btn"
            clickHandler={() => setListModal(true)}
          >
            Новый список
          </Button>
          <Lists />
        </div>
        <div
          className={cn('list-menu__outside', {
            active: isOpen,
            md: isMediaMD,
          })}
          onClick={onClose}
        />
      </div>
    </CSSTransition>
  );
};

export default ListMenu;
