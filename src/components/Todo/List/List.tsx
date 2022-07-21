import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import Button from '@components/ui/Button';
import FormInput from '@components/ui/FormInput';
import Icon from '@components/ui/Icon';
import Modal from '@components/ui/Modal';
import {
  TodoList,
  deleteList,
  editList,
  setActiveList,
} from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
import './List.scss';

const List: FC<TodoList> = ({ id, title, todos, active }) => {
  const [showIcons, setShowIcons] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const defaultValues = { title };
  const {
    handleSubmit,
    formState: { isDirty },
    control,
    reset,
  } = useForm({ defaultValues });
  const dispatch = useAppDispatch();

  useEffect(() => {
    !modal && setShowIcons(false);
  }, [modal]);

  const handleClick = () => {
    dispatch(setActiveList(id));
  };

  const onListMouseEnter = () => {
    setShowIcons(true);
  };

  const onListMouseLeave = () => {
    setShowIcons(false);
  };

  const handleEdit = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setModal(true);
  };

  const handleDelete = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(deleteList(id));
  };

  const renderModalTitle = <>Редактировать &quot;{title}&quot;</>;

  const cancel = () => {
    reset(defaultValues);
    setModal(false);
  };

  const close = () => {
    setModal(false);
  };

  const onSubmit = (data: { title: string }) => {
    dispatch(editList({ id, data }));
    setModal(false);
    reset(data);
  };

  return (
    <div
      className={cn('list', {
        active,
      })}
      onClick={handleClick}
      onMouseEnter={onListMouseEnter}
      onMouseLeave={onListMouseLeave}
    >
      <div className="list__title">{title}</div>
      {showIcons ? (
        <div className="list__icons-wrapper">
          <Icon
            type="edit"
            className="list__icon list__icon-edit"
            clickHandler={handleEdit}
          />
          <Icon
            type="delete"
            className="list__icon list__icon-delete"
            clickHandler={handleDelete}
          />
        </div>
      ) : (
        <div className="list__todos-quantity">{todos.length}</div>
      )}
      <Modal title={renderModalTitle} isOpen={modal} closeHandler={close}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput label="Название" name="title" control={control} />

          <div className="list__btn-wrapper">
            {isDirty ? (
              <>
                <Button
                  className="settings__btn-cancel"
                  type="cancel"
                  clickHandler={cancel}
                >
                  Отмена
                </Button>
                <Button className="settings__btn-submit" type="submit">
                  Изменить
                </Button>
              </>
            ) : (
              <Button className="settings__btn-close" clickHandler={close}>
                Закрыть
              </Button>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default List;
