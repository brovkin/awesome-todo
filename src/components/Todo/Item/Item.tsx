import React, { FC } from 'react';
import './Item.scss';
import Checkbox from '../Checkbox';

const Item: FC = () => {
  return (
    <div className="todo-item">
      <label className="todo-item__label">
        <div className="todo-item__wrapper">
          <Checkbox name={'test'} initialValue={true} />
        </div>
      </label>
    </div>
  );
};

export default Item;
