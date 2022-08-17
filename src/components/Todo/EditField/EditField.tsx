import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import Icon from '@components/ui/Icon';
import Input from '@components/ui/Input';
import { confirmEditTodo, editTodo } from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
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
        <Icon
          className="todo-item__icon todo-item__menu-tick"
          type="tick"
          clickHandler={handleConfirmUpdate}
        />
        <Icon
          className="todo-item__icon todo-item__menu-cancel"
          type="cancel"
          clickHandler={handleCancelUpdate}
        />
      </div>
    </div>
  );
};

export default EditField;
