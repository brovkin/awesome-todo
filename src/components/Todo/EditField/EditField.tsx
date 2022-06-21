import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import Input from '@components/ui/Input';
import { confirmEditTodo, editTodo } from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
import { ReactComponent as Cancel } from '@assets/icons/cancel.svg';
import { ReactComponent as Tick } from '@assets/icons/tick.svg';
import './EditField.scss';

interface EditFieldProps {
  id: string;
  value: string;
  listId: string;
}

const EditField: FC<EditFieldProps> = ({ id, listId, value }) => {
  const [text, setText] = useState<string>(value);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
  };

  const handleConfirmUpdate = () => {
    dispatch(
      confirmEditTodo({
        listId,
        id,
        value: text,
      })
    );
  };

  const handleCancelUpdate = () => {
    dispatch(
      editTodo({
        listId,
        id,
        value: false,
      })
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConfirmUpdate();
    }

    if (e.key === 'Escape') {
      handleCancelUpdate();
    }
  };

  return (
    <div className="edit-field">
      <Input
        className="edit-field__input"
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onMount="select"
        value={text}
      />

      <div className="todo-item__menu">
        <i
          className="todo-item__icon todo-item__menu-tick"
          onClick={handleConfirmUpdate}
        >
          <Tick />
        </i>
        <i
          className="todo-item__icon todo-item__menu-cancel"
          onClick={handleCancelUpdate}
        >
          <Cancel />
        </i>
      </div>
    </div>
  );
};

export default EditField;
