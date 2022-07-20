import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  RefObject,
  useEffect,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';
import Input from '@components/ui/Input';
import { Todo, TodoList, addTodo } from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
import Button from '../../ui/Button';
import './InputField.scss';

interface InputFieldProps {
  listId: TodoList['id'];
}

const InputField: FC<InputFieldProps> = ({ listId }) => {
  const [todoText, setTodoText] = useState<string>('Buy a cup of coffee');
  const [error, setError] = useState<boolean>(false);
  const [inputRef, setInputRef] =
    useState<React.RefObject<HTMLInputElement> | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    inputRef?.current?.focus();
  }, [listId]);

  useEffect(() => {
    setError(false);
  }, [todoText]);

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

      dispatch(addTodo({ listId, newTodo }));

      setTodoText('');
    } else {
      setError(true);
    }

    inputRef?.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addNewTodo();
    }
  };

  const getRef = (ref: RefObject<HTMLInputElement>): void => {
    setInputRef(ref);
  };

  return (
    <div className="input-field">
      <Input
        type="text"
        className="input-field__input"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onMount="focus"
        value={todoText}
        getRef={getRef}
        error={error}
      />
      <Button className="input-field__add-btn" clickHandler={addNewTodo}>
        Добавить
      </Button>
    </div>
  );
};

export default InputField;
