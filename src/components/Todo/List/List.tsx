import React, { FC, useEffect, useState } from 'react';
import DragDrop from '@components/Todo/DragDrop';
import { getTodos } from '@features/todoSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import Notification from '../../Notification';
import './List.scss';

const List: FC = () => {
  const items = useAppSelector((state) => state.todo.items);
  const dispatch = useAppDispatch();
  const [draggableList, setDraggableList] = useState(items);

  useEffect(() => {
    setDraggableList(items);
  }, [items]);

  useEffect(() => {
    dispatch(getTodos(null));
  }, []);

  const renderList = () => {
    if (items.length) {
      return <DragDrop draggableList={draggableList} />;
    }

    return <Notification type="info" text="В списке нет TODOs" />;
  };

  return renderList();
};

export default List;
