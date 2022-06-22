import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { INTERFACE_ERRORS } from '@components/Notification/Notification';
import Button from '@components/ui/Button';
import Icon from '@components/ui/Icon';
import Input from '@components/ui/Input';
import Modal from '@components/ui/Modal';
import { TodoList, createList } from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
import { RootState } from '@app/store';
import './Actions.scss';

const Actions: FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Новый лист');
  const [error, setError] = useState<string>('');

  const allLists = useSelector((state: RootState) => state.todo.lists);

  const allListsTitles = allLists.map((list) => list.title);

  useEffect(() => {
    setError('');
  }, [title, modal]);

  const dispatch = useAppDispatch();

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTitle(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreateList();
    }
  };

  const handleCreateList = () => {
    if (allListsTitles.includes(title)) {
      setError(INTERFACE_ERRORS.listAlreadyExists);
    } else {
      const newList: TodoList = {
        id: uuid(),
        title,
        todos: [],
        // if lists haven't exist
        active: allLists.length === 0,
      };

      dispatch(createList(newList));
      setTitle('Новый лист');
      setModal(false);
    }
  };

  return (
    <div className="actions">
      <Button
        clickHandler={() => setModal(true)}
        className="actions__create-btn"
        type="icon"
        icon={<Icon type="plus" />}
        tooltip="Создать новый список"
      />
      <Modal isOpen={modal} closeHandler={() => setModal(false)}>
        <h3 className="actions__modal-create-title">
          Введите название нового листа
        </h3>
        <div className="actions__modal-create-form">
          <Input
            className="actions__modal-create-input"
            type="text"
            onChange={handleChangeTitle}
            onKeyDown={handleKeyDown}
            onClick={() => setError('')}
            value={title}
            error={error}
            onMount="select"
          />
          <Button
            clickHandler={handleCreateList}
            className="actions__modal-create-btn"
          >
            Создать лист
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Actions;
