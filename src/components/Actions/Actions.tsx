import React, { FC, useState } from 'react';
import Button from '@components/ui/Button';
import Icon from '@components/ui/Icon';
import Modal from '@components/ui/Modal';
import './Actions.scss';

interface ActionsProps {
  [key: string]: any;
}

const Actions: FC<ActionsProps> = () => {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <div className="actions">
      <Button
        clickHandler={() => setModal(true)}
        type="icon"
        icon={<Icon type="plus" />}
        tooltip="Создать новый дайджест"
      />
      <Modal isOpen={modal} closeHandler={() => setModal(false)}>
        <h3>Введите название нового листа</h3>
        <input type="text" />
      </Modal>
    </div>
  );
};

export default Actions;
