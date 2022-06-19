import React, { FC, useEffect } from 'react';
import DragDrop from '@components/Todo/DragDrop';
import InputField from '@components/Todo/InputField';
import { getTodos } from '@features/todoSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import Notification from '../../Notification';
import './ItemsList.scss';

const ItemsList: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos(null));
  }, []);

  const activeList = useAppSelector(
    (state) => state.todo.lists.find((list) => list.active) || null
  );

  if (!activeList) {
    return <Notification type="info" text="Нет активных листов" />;
  }

  const { id, todos } = activeList;

  const renderList = () => {
    if (todos.length) {
      return <DragDrop listId={id} draggableList={todos} />;
    }

    return <Notification type="info" text="В списке нет TODOs" />;
  };

  return (
    <>
      <InputField listId={id} />
      {renderList()}
    </>
  );
};

export default ItemsList;
