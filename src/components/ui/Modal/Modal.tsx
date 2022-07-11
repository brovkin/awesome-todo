import React, { FC, useEffect } from 'react';
import ReactModal from 'react-modal';
import Icon from '@components/ui/Icon';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  closeHandler?: () => void;
  children: JSX.Element | React.ReactNode;
  title: JSX.Element | React.ReactNode;
}

ReactModal.setAppElement('#root');

const Modal: FC<ModalProps> = ({ isOpen, closeHandler, children, title }) => {
  useEffect(() => {
    const close = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && closeHandler) {
        closeHandler();
      }
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      className="react-modal"
      overlayClassName="modal"
      portalClassName="modal-portal"
      onRequestClose={closeHandler}
      shouldCloseOnOverlayClick={true}
    >
      <div className="modal__wrapper">
        <Icon
          className="modal__close"
          type="cross"
          clickHandler={closeHandler}
        />
        <h3 className="modal__title">{title}</h3>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
