import React, { FC, useContext, useEffect } from 'react';
import DragDrop from '@components/Todo/DragDrop';
import InputField from '@components/Todo/InputField';
import Button from '@components/ui/Button';
import { getTodos } from '@features/todoSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { CreateListContext } from '@context/CreateListContext';
import Notification from '../../Notification';
import './ItemsList.scss';

const ItemsList: FC = () => {
  const { setListModal } = useContext(CreateListContext) as CreateListContext;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos(null));
  }, []);

  const activeList = useAppSelector(
    (state) => state.todo.lists.find((list) => list.active) || null
  );

  if (!activeList) {
    return (
      <>
        <Button
          className="todo-list__create-new-list-btn"
          clickHandler={() => setListModal(true)}
        >
          Создать первый лист
        </Button>
        <Notification type="info" text="Нет активных списков" />
      </>
    );
  }

  const { id, todos } = activeList;

  const renderList = () => {
    if (todos.length) {
      return <DragDrop listId={id} draggableList={todos} />;
    }

    return <Notification type="info" text="Список пуст" />;
  };

  return (
    <>
      <InputField listId={id} />
      {renderList()}
    </>
  );
};

export default ItemsList;
