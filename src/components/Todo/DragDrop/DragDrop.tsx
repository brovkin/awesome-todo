import React, { FC } from 'react';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import Item from '@components/Todo/Item';
import Icon from '@components/ui/Icon';
import { Todo, TodoList, updateAllTodos } from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';

interface DragDropProps {
  draggableList: Todo[];
  listId: TodoList['id'];
}

const DragDrop: FC<DragDropProps> = ({ listId, draggableList }) => {
  const dispatch = useAppDispatch();
  const handleDrop = (droppedItem: DropResult) => {
    if (!droppedItem.destination) return;
    const updatedList = [...draggableList];
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

    dispatch(updateAllTodos({ listId, updatedList }));
  };

  return (
    <DragDropContext onDragEnd={handleDrop}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <div
            className="todo-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {draggableList.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    className="item-container"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <Item key={item.id} listId={listId} {...item}>
                      <div
                        className="todo-item__dragger"
                        {...provided.dragHandleProps}
                      >
                        <Icon type="dragger" />
                      </div>
                    </Item>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDrop;
