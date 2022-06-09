import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import './List.scss';
import Item from '../Item';
import { getTodos } from '../../../features/todoSlice';

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

    return <div>В списке нет TODOs</div>;
  };

  return <div className="todo-list">{renderList()}</div>;
};

export default List;
