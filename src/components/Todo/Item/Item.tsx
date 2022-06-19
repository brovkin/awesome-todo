import React, { FC } from 'react';
import { Todo, deleteTodo, editTodo } from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
import { ReactComponent as Delete } from '@assets/icons/delete.svg';
import { ReactComponent as Edit } from '@assets/icons/edit.svg';
import Checkbox from '../Checkbox';
import EditField from '../EditField';
import './Item.scss';

interface ItemProps extends Todo {
  children: JSX.Element | React.ReactNode;
  listId: string;
}

const Item: FC<ItemProps> = ({ id, title, done, edit, listId, children }) => {
  const dispatch = useAppDispatch();
  const handleEdit = () => {
    dispatch(editTodo({ listId, id, value: true }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo({ listId, id }));
  };

  return (
    <div className="todo-item">
      {!edit && (
        <label className="todo-item__label">
          <div className="todo-item__wrapper">
            <Checkbox
              id={id}
              listId={listId}
              checked={done}
              title={title}
              edit={edit}
            />
          </div>
        </label>
      )}
      {edit && <EditField id={id} listId={listId} value={title} />}
      {!edit && (
        <div className="todo-item__menu">
          <>
            <i
              className="todo-item__icon todo-item__menu-edit"
              onClick={handleEdit}
            >
              <Edit />
            </i>
            <i
              className="todo-item__icon todo-item__menu-delete"
              onClick={handleDelete}
            >
              <Delete />
            </i>
          </>
        </div>
      )}
      {children}
    </div>
  );
};

export default Item;
