import React, { FC } from 'react';
import { getTodoLists } from '@selectors/todo';
import List from '@components/Todo/List';
import { useAppSelector } from '@app/hooks';
import './Lists.scss';

const Lists: FC = () => {
  const lists = useAppSelector(getTodoLists);
  return (
    <div className="lists">
      {lists.map((list) => (
        <List key={list.id} {...list} />
      ))}
    </div>
  );
};

export default Lists;
