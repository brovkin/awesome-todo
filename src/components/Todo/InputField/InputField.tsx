import React, { ChangeEvent, FC, useState } from 'react';
import './InputField.scss';
import { addTodo, Todo } from '../../../features/todoSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

const InputField: FC = () => {
  const [todoText, setTodoText] = useState<string>('Buy a cup of coffee');
  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodoText(value);
  };

  const addNewTodo = () => {
    const newTodo: Todo = {
      id: `123_${todoText}`,
      title: todoText,
      done: false,
    };

    dispatch(addTodo(newTodo));

    // setTodoText('');
  };

  return (
    <div className="input-field">
      <input
        type="text"
        className="input-field__input"
        onChange={handleChange}
        value={todoText}
      />
      <button className="input-field__add-btn" onClick={addNewTodo}>
        Add New Todo
      </button>
    </div>
  );
};

export default InputField;
