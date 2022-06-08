import React, { ChangeEvent, FC, useState } from 'react';
import './Checkbox.scss';
import { checkedTodo } from '../../../features/todoSlice';
import { useAppDispatch } from '../../../app/hooks';
import Title from '../Title';
import cn from 'classnames';

export interface CheckboxProps {
  id: string;
  checked: boolean;
  title: string;
}

const Checkbox: FC<CheckboxProps> = ({ id, checked, title }) => {
  const [done, setDone] = useState<boolean>(checked);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setDone(value);
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
          checked={done}
        />
        <div className="todo-checkbox__checkbox">
          <div className="todo-checkbox__checkbox-tick" />
        </div>
      </div>
      <Title
        className={cn({
          active: done,
        })}
      >
        {title}
      </Title>
    </>
  );
};

export default Checkbox;
