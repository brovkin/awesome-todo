import React, { FC, useRef, useState } from 'react';
import cn from 'classnames';
import Dragger from '@components/Dragger';
import { Todo, deleteTodo, editTodo } from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
import { ReactComponent as Delete } from '@assets/icons/delete.svg';
import { ReactComponent as Edit } from '@assets/icons/edit.svg';
import Checkbox from '../Checkbox';
import EditField from '../EditField';
import './Item.scss';

const Item: FC<Todo> = ({ id, title, done, edit }) => {
  const itemRef = useRef(null);
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
              <Edit />
            </i>
            <i
              className="todo-item__icon todo-item__menu-delete"
              onClick={handleDelete}
            >
              <Delete />
            </i>
          </>
        )}
      </div>
      <Dragger id={id} itemRef={itemRef} />
    </div>
  );
};

export default Item;
