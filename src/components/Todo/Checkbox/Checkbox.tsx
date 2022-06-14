import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
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

        <CSSTransition in={checked} timeout={100} classNames="tick-animation">
          <div className="todo-checkbox__checkbox">
            <div className="todo-checkbox__checkbox-tick" />
          </div>
        </CSSTransition>
      </div>
      {!edit && <Title checked={checked}>{title}</Title>}
    </>
  );
};

export default Checkbox;
