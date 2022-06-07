import React, { ChangeEvent, FC, useState } from 'react';
import './Checkbox.scss';
import Title from '../Title';
import cn from 'classnames';

export interface CheckboxProps {
  name: string;
  checked: boolean;
  title: string;
}

const Checkbox: FC<CheckboxProps> = ({ name, checked, title }) => {
  const [done, setDone] = useState<boolean>(checked);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setDone(value);
  };

  return (
    <>
      <div className="todo-checkbox">
        <input
          className="todo-checkbox__real-checkbox"
          type="checkbox"
          onChange={handleChange}
          checked={done}
          name={name}
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
