import React, { ChangeEvent, FC, useState } from 'react';
import './Checkbox.scss';
import Title from '../Title';
import cn from 'classnames';

export interface CheckboxProps {
  name: string;
  initialValue: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ name, initialValue }) => {
  const [checked, setChecked] = useState<boolean>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setChecked(value);
  };

  return (
    <>
      <div className="todo-checkbox">
        <input
          className="todo-checkbox__real-checkbox"
          type="checkbox"
          onChange={handleChange}
          checked={checked}
          name={name}
        />
        <div className="todo-checkbox__checkbox">
          <div className="todo-checkbox__checkbox-tick" />
        </div>
      </div>
      <Title
        className={cn({
          active: checked,
        })}
      >
        My first todo
      </Title>
    </>
  );
};

export default Checkbox;
