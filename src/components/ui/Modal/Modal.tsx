import React, { FC, KeyboardEvent, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import Icon from '@components/ui/Icon';
import usePortal from '@hooks/usePortal';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  closeHandler: () => void;
  children: JSX.Element | React.ReactNode;
  className?: string;
}

interface PortalProps {
  id: string;
  children: JSX.Element | React.ReactNode;
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

  const Portal = ({ id, children }: PortalProps) => {
    const target = usePortal(id);
    return createPortal(children, target);
  };

  return isOpen ? (
    <Portal id="modal" key="test">
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
    </Portal>
  ) : null;
};

export default Modal;
