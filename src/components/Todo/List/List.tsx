import React, { FC, MouseEvent, useContext, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import Form from '@components/ui/Form';
import FormInput from '@components/ui/FormInput';
import Icon from '@components/ui/Icon';
import Modal from '@components/ui/Modal';
import Tooltip from '@components/ui/Tooltip';
import {
  TodoList,
  deleteList,
  editList,
  setActiveList,
} from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
import { RootState } from '@app/store';
import useMedia from '@hooks/useMedia';
import { NotificationContext } from '@context/NotificationContext';
import { MEDIA_QUERIES } from '@constants';
import './List.scss';

const List: FC<TodoList> = ({ id, title, todos, active }) => {
  const isMediaSM = useMedia(MEDIA_QUERIES.sm);
  const [showIcons, setShowIcons] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const defaultValues: FieldValues = { title };

  const { showNotification } = useContext(
    NotificationContext
  ) as NotificationContext;

  const allLists = useSelector((state: RootState) => state.todo.lists);

  const allListsTitles = allLists.map((list) => list.title);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ mode: 'onChange', defaultValues });
  const dispatch = useAppDispatch();

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
    showNotification('delete', `Удален список ${title}`);
  };

  const renderModalTitle = <>Редактировать &quot;{title}&quot;</>;

  const renderIcons = () => (
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
  );

  const renderQuantity = () => (
    <div className="list__todos-quantity">{todos.length}</div>
  );

  const renderDesktopActionBlock = () =>
    showIcons ? renderIcons() : renderQuantity();

  const renderMobileActionBlock = () => renderIcons();

  const cancel = () => {
    reset(defaultValues);
    setModal(false);
  };

  const close = () => {
    setShowIcons(false);
    setModal(false);
  };

  const onSubmit = (data: FieldValues) => {
    dispatch(editList({ id, data }));
    setModal(false);
    reset(data);
  };

  const transformTitle = (title: string, symbols: number) => {
    let newTitle = title;
    if (title.length > symbols) {
      newTitle = newTitle.substring(0, symbols) + '...';
    }

    return newTitle;
  };

  const transformedTitle = transformTitle(title, 20);

  return (
    <div
      className={cn('list', {
        active,
      })}
      onClick={handleClick}
      onMouseEnter={onListMouseEnter}
      onMouseLeave={onListMouseLeave}
    >
      <Tooltip content={title} condition={title.length > 20}>
        <div className="list__title">{transformedTitle}</div>
      </Tooltip>
      {isMediaSM ? renderMobileActionBlock() : renderDesktopActionBlock()}
      <Modal title={renderModalTitle} isOpen={modal} closeHandler={close}>
        <Form
          errors={errors}
          close={close}
          cancel={cancel}
          onSubmit={handleSubmit(onSubmit)}
          submitText="Изменить"
        >
          <FormInput
            control={control}
            label="Название списка"
            name="title"
            rules={{
              required: true,
              validate: {
                listAlreadyExists: (value: string) =>
                  !allListsTitles.includes(value),
              },
            }}
            autoFocus
          />
        </Form>
      </Modal>
    </div>
  );
};

export default List;
