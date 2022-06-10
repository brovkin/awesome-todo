import React, { FC } from 'react';
import cn from 'classnames';
import { checkedTodo } from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
import Title from '../Title';
import './Checkbox.scss';

export interface CheckboxProps {
  id: string;
  checked: boolean;
  title: string;
  edit: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ id, checked, title, edit }) => {
  const dispatch = useAppDispatch();

  const handleChange = () => {
    dispatch(checkedTodo(id));
  };

  return (
    <>
      <div className="todo-checkbox">
        <input
          name={id}
          className="todo-checkbox__real-checkbox"
          type="checkbox"
          onChange={handleChange}
          checked={checked}
        />
        <div className="todo-checkbox__checkbox">
          <div className="todo-checkbox__checkbox-tick" />
        </div>
      </div>
      {!edit && (
        <Title
          className={cn({
            active: checked,
          })}
        >
          {title}
        </Title>
      )}
    </>
  );
};

export default Checkbox;
