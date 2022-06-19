import React, { FC } from 'react';
import cn from 'classnames';
import { TodoList, setActiveList } from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
import './List.scss';

const List: FC<TodoList> = ({ id, title, todos, active }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setActiveList(id));
  };

  return (
    <div
      className={cn('list', {
        active,
      })}
      onClick={handleClick}
    >
      <div className="list__title">{title}</div>
      <div className="list__todos-quantity">{todos.length}</div>
    </div>
  );
};

export default List;
