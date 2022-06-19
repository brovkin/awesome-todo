import React, { FC } from 'react';
import List from '@components/Todo/List';
import { useAppSelector } from '@app/hooks';
import './Lists.scss';

const Lists: FC = () => {
  const lists = useAppSelector((state) => state.todo.lists);
  return (
    <div className="lists">
      {lists.map((list) => (
        <List key={list.id} {...list} />
      ))}
    </div>
  );
};

export default Lists;
