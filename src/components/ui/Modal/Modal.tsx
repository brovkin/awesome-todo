import React, { FC, KeyboardEvent, MouseEvent } from 'react';
import cn from 'classnames';
import Icon from '@components/ui/Icon';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  closeHandler: () => void;
  children: JSX.Element | React.ReactNode;
  className?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  closeHandler,
  children,
  className,
}) => {
  const handleBlockClick = (e: MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      closeHandler();
    }
  };

  return isOpen ? (
    <div
      className={cn('modal', className)}
      onClick={closeHandler}
      onKeyDown={handleKeyDown}
    >
      <div className="modal__wrapper" onClick={handleBlockClick}>
        <Icon
          className="modal__close"
          type="cross"
          clickHandler={closeHandler}
        />
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
