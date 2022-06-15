import React, { FC, ReactEventHandler } from 'react';
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
  return isOpen ? (
    <div className={cn('modal', className)} onClick={closeHandler}>
      <div className="modal__wrapper" onClick={(e: any) => e.stopPropagation()}>
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
