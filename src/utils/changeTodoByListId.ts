import { Todo, TodoList } from '@features/todoSlice';

const changeTodoByListId = (
  lists: TodoList[],
  listId: string,
  updatedTodos: Todo[]
) => {
  return lists.map((list) => {
    if (list.id === listId) {
      return {
        ...list,
        todos: updatedTodos,
      };
    }

    return list;
  });
};

export default changeTodoByListId;
