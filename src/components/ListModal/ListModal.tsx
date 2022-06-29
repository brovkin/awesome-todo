import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { INTERFACE_ERRORS } from '@components/Notification/Notification';
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import Modal from '@components/ui/Modal';
import { TodoList, createList } from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
import { RootState } from '@app/store';
import { CreateListContext } from '@context/CreateListContext';

const ListModal: FC = () => {
  const { listModal, setListModal } = useContext(
    CreateListContext
  ) as CreateListContext;
  const [title, setTitle] = useState<string>('Новый список');
  const [error, setError] = useState<string>('');

  const allLists = useSelector((state: RootState) => state.todo.lists);

  const allListsTitles = allLists.map((list) => list.title);

  useEffect(() => {
    setError('');
  }, [title, listModal]);

  const dispatch = useAppDispatch();

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
      setTitle('Новый список');
      setListModal(false);
    }
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTitle(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreateList();
    }
  };
  return (
    <Modal
      isOpen={listModal}
      closeHandler={() => setListModal(false)}
      title="Введите название нового списка"
    >
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
          Создать список
        </Button>
      </div>
    </Modal>
  );
};

export default ListModal;
