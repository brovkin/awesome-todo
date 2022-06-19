import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Button from '@components/ui/Button';
import Icon from '@components/ui/Icon';
import Modal from '@components/ui/Modal';
import { TodoList, createList } from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
import './Actions.scss';

interface ActionsProps {
  [key: string]: any;
}

const Actions: FC<ActionsProps> = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Новый лист');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (modal && inputRef) {
      inputRef.current?.focus();
    }
  }, [modal]);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTitle(value);
  };

  const handleCreateList = () => {
    const newList: TodoList = {
      id: uuid(),
      title,
      todos: [],
      active: false,
    };

    dispatch(createList(newList));
    setTitle('Новый лист');
    setModal(false);
  };

  return (
    <div className="actions">
      <Button
        clickHandler={() => setModal(true)}
        type="icon"
        icon={<Icon type="plus" />}
        tooltip="Создать новый список"
      />
      <Modal isOpen={modal} closeHandler={() => setModal(false)}>
        <h3>Введите название нового листа</h3>
        <input
          ref={inputRef}
          type="text"
          onChange={handleChangeTitle}
          value={title}
        />
        <Button clickHandler={handleCreateList}>Создать лист</Button>
      </Modal>
    </div>
  );
};

export default Actions;
