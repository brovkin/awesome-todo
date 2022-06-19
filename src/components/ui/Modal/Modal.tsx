import React, { FC, MouseEvent } from 'react';
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
  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  return isOpen ? (
    <div className={cn('modal', className)} onClick={closeHandler}>
      <div className="modal__wrapper" onClick={handleOutsideClick}>
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
