import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { ReactComponent as Tick } from '../../../assets/icons/tick.svg';
import { ReactComponent as Cancel } from '../../../assets/icons/cancel.svg';
import { useAppDispatch } from '../../../app/hooks';
import { confirmEditTodo, editTodo } from '../../../features/todoSlice';
import './EditField.scss';

interface EditFieldProps {
  id: string;
  value: string;
}

const EditField: FC<EditFieldProps> = ({ id, value }) => {
  const [text, setText] = useState<string>(value);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    inputRef.current?.select();
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
  };

  const handleConfirmUpdate = () => {
    dispatch(
      confirmEditTodo({
        id,
        value: text,
      })
    );
  };

  const handleCancelUpdate = () => {
    dispatch(
      editTodo({
        id,
        value: false,
      })
    );
  };

  return (
    <div className="edit-field">
      <input
        ref={inputRef}
        className="edit-field__input"
        type="text"
        onChange={handleChange}
        value={text}
      />

      <div className="todo-item__menu">
        <i
          className="todo-item__icon todo-item__menu-tick"
          onClick={handleConfirmUpdate}
        >
          {<Tick />}
        </i>
        <i
          className="todo-item__icon todo-item__menu-cancel"
          onClick={handleCancelUpdate}
        >
          {<Cancel />}
        </i>
      </div>
    </div>
  );
};

export default EditField;
