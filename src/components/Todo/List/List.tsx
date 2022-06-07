import React, { FC } from 'react';
import { useAppSelector } from '../../../app/hooks';
import Item from '../Item';

const List: FC = () => {
  const items = useAppSelector((state) => state.todo.items);
  console.log('itesm', items);
  const renderList = () => {
    return items.map((item) => <Item key={item.id} {...item} />);
  };

  return <div>{renderList()}</div>;
};

export default List;
