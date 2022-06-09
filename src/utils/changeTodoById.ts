import { Todo } from '../features/todoSlice';
import { updateLocalStorage } from './localStorage';

interface changeTodoProps {
  (
    id: string,
    items: Todo[],
    changedValues: { [key: string]: boolean | string }
  ): Todo[];
}

const changeTodoById: changeTodoProps = (id, items, changedValues) => {
  const todos = items.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...changedValues,
      };
    }

    return item;
  });

  updateLocalStorage(todos);

  return todos;
};

export default changeTodoById;
