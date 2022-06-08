import React, { FC } from 'react';
import './Item.scss';
import Checkbox from '../Checkbox';
import { Todo } from '../../../features/todoSlice';

const Item: FC<Todo> = ({ id, title, done }) => {
  return (
    <div className="todo-item">
      <label className="todo-item__label">
        <div className="todo-item__wrapper">
          <Checkbox id={id} checked={done} title={title} />
        </div>
      </label>
    </div>
  );
};

export default Item;
