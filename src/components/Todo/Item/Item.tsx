import React, { FC } from 'react';
import './Item.scss';
import Checkbox from '../Checkbox';
import { deleteTodo, editTodo, Todo } from '../../../features/todoSlice';
import { ReactComponent as Edit } from '../../../assets/icons/edit.svg';
import { ReactComponent as Delete } from '../../../assets/icons/delete.svg';
import { useAppDispatch } from '../../../app/hooks';
import EditField from '../EditField';

const Item: FC<Todo> = ({ id, title, done, edit }) => {
  const dispatch = useAppDispatch();
  const handleEdit = () => {
    dispatch(editTodo({ id, value: true }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="todo-item">
      {!edit && (
        <label className="todo-item__label">
          <div className="todo-item__wrapper">
            <Checkbox id={id} checked={done} title={title} edit={edit} />
          </div>
        </label>
      )}
      {edit && <EditField id={id} value={title} />}
      <div className="todo-item__menu">
        {!edit && (
          <>
            <i
              className="todo-item__icon todo-item__menu-edit"
              onClick={handleEdit}
            >
              {<Edit />}
            </i>
            <i
              className="todo-item__icon todo-item__menu-delete"
              onClick={handleDelete}
            >
              {<Delete />}
            </i>
          </>
        )}
      </div>
    </div>
  );
};

export default Item;
