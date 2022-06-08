import React, { ChangeEvent, FC, useState } from 'react';
import './Checkbox.scss';
import { checkedTodo } from '../../../features/todoSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ReactComponent as Edit } from '../../../assets/icons/edit.svg';
import { ReactComponent as Delete } from '../../../assets/icons/delete.svg';
import Title from '../Title';
import cn from 'classnames';
import EditField from '../EditField';
import InputField from '../InputField';

export interface CheckboxProps {
  id: string;
  checked: boolean;
  title: string;
  isEdit: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ id, checked, title, isEdit }) => {
  console.log('checked', checked);
  const [done, setDone] = useState<boolean>(checked);
  console.log('is Edit', isEdit);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('check', checked);
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
      {!isEdit && (
        <Title
          className={cn({
            active: done,
          })}
        >
          {title}
        </Title>
      )}
    </>
  );
};

export default Checkbox;
