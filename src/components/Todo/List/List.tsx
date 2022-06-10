import React, { FC, useEffect } from 'react';
import { getTodos } from '@features/todoSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import Notification from '../../Notification';
import Item from '../Item';
import './List.scss';

const List: FC = () => {
  const items = useAppSelector((state) => state.todo.items);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodos(null));
  }, []);

  const renderList = () => {
    if (items.length) {
      return items.map((item) => <Item key={item.id} {...item} />);
    }

    return <Notification type="info" text="В списке нет TODOs" />;
  };

  return <div className="todo-list">{renderList()}</div>;
};

export default List;
