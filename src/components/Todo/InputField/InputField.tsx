import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import './InputField.scss';
import { v4 as uuid } from 'uuid';
import { addTodo, Todo } from '../../../features/todoSlice';
import { useAppDispatch } from '../../../app/hooks';
import Button from '../../ui/Button';

const InputField: FC = () => {
  const [todoText, setTodoText] = useState<string>('Buy a cup of coffee');
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodoText(value);
  };

  const addNewTodo = () => {
    if (todoText) {
      const id = uuid();
      const newTodo: Todo = {
        id,
        title: todoText,
        done: false,
        edit: false,
      };

      dispatch(addTodo(newTodo));

      // setTodoText('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addNewTodo();
    }
  };

  return (
    <div className="input-field">
      <input
        ref={inputRef}
        type="text"
        className="input-field__input"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={todoText}
      />
      <Button className="input-field__add-btn" clickHandler={addNewTodo}>
        Add New Todo
      </Button>
    </div>
  );
};

export default InputField;
