import { Todo } from '@features/todoSlice';

interface changeTodoProps {
  (
    id: string,
    items: Todo[],
    changedValues: { [key: string]: boolean | string }
  ): Todo[];
}

const changeTodoById: changeTodoProps = (id, items, changedValues) => {
  return items.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...changedValues,
      };
    }

    return item;
  });
};

export default changeTodoById;
