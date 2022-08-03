import React, { FC, useContext } from 'react';
import DragDrop from '@components/Todo/DragDrop';
import InputField from '@components/Todo/InputField';
import Title from '@components/Todo/ItemsList/Title';
import Button from '@components/ui/Button';
import { useAppSelector } from '@app/hooks';
import { CreateListContext } from '@context/CreateListContext';
import { getTodoLists } from '@selectors/todo';
import Notification from '../../Notification';
import './ItemsList.scss';

const ItemsList: FC = () => {
  const { setListModal } = useContext(CreateListContext) as CreateListContext;

  const lists = useAppSelector(getTodoLists);

  const activeList = lists.length ? lists.find((list) => list.active) : null;

  if (!activeList) {
    return (
      <>
        <Button
          className="todo-list__create-new-list-btn"
          clickHandler={() => setListModal(true)}
        >
          Создать первый список
        </Button>
        <Notification type="info" text="Нет активных списков" />
      </>
    );
  }

  const { id, title, todos } = activeList;

  const renderList = () => {
    if (todos.length) {
      return <DragDrop listId={id} draggableList={todos} />;
    }

    return <Notification type="info" text="Список пуст" />;
  };

  return (
    <>
      <Title listId={id} title={title} />
      <InputField listId={id} />
      {renderList()}
    </>
  );
};

export default ItemsList;
