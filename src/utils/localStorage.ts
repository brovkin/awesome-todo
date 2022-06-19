import { STORAGE_NAME } from '@constants';
import { TodoList } from '@features/todoSlice';

export const getLocalStorage = (storageName: string): TodoList[] => {
  const json: string | null = localStorage.getItem(storageName);
  return json ? JSON.parse(json) : [];
};

// export const saveToLocalStorage = (todo: Todo): void => {
//   const storage = getLocalStorage(STORAGE_NAME);
//   const allTodos = [...storage, todo];
//   const json = JSON.stringify(allTodos);
//   localStorage.setItem(STORAGE_NAME, json);
// };

export const updateLocalStorage = (lists: TodoList[]): void => {
  const json = JSON.stringify(lists);
  localStorage.setItem(STORAGE_NAME, json);
};

// export const deleteFromLocalStorage = (id: Todo['id']): void => {
//   const storage = getLocalStorage(STORAGE_NAME);
//   const restTodos = storage.filter((todo) => todo.id !== id);
//   const json = JSON.stringify(restTodos);
//   localStorage.setItem(STORAGE_NAME, json);
// };
