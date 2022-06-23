import React, { FC, useContext } from 'react';
import Button from '@components/ui/Button';
import Icon from '@components/ui/Icon';
import { CreateListContext } from '@context/CreateListContext';
import './Actions.scss';

const Actions: FC = () => {
  const { setListModal } = useContext(CreateListContext) as CreateListContext;

  return (
    <div className="actions">
      <Button
        clickHandler={() => setListModal(true)}
        className="actions__create-btn"
        type="icon"
        icon={<Icon type="plus" />}
        tooltip="Создать новый список"
      />
    </div>
  );
};

export default Actions;
