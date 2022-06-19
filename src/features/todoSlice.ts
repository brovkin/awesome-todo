import { Slice, createSlice } from '@reduxjs/toolkit';
import { getLocalStorage, updateLocalStorage } from '@utils/localStorage';
import { STORAGE_NAME } from '@constants';
import changeTodoById from '../utils/changeTodoById';

export interface Todo {
  id: string;
  title: string;
  done: boolean;
  edit: boolean;
}

export interface TodoList {
  id: string;
  title: string;
  todos: Todo[];
  active: boolean;
}

interface State {
  items: Todo[];
  lists: TodoList[];
}

const initialState = { items: [], lists: [] } as State;

export const todoSlice: Slice<State> = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    getTodos: (state) => {
      state.lists = getLocalStorage(STORAGE_NAME);
    },
    addTodo: (state, action) => {
      const { listId, newTodo } = action.payload;
      const updatedLists = state.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            todos: [...list.todos, newTodo],
          };
        }

        return list;
      });
      state.lists = updatedLists;
      updateLocalStorage(updatedLists);
    },
    checkedTodo: (state, action) => {
      const { id, listId } = action.payload;
      const currentList = state.lists.find((list) => list.id === listId);
      const currentTodo = currentList?.todos.find((todo) => todo.id === id);
      const value = currentTodo?.done;

      const updatedLists = state.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            todos: changeTodoById(id, list.todos, { done: !value }),
          };
        }

        return list;
      });
      state.lists = updatedLists;
      updateLocalStorage(updatedLists);
    },
    deleteTodo: (state, action) => {
      const { listId, id } = action.payload;
      const updatedLists = state.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            todos: list.todos.filter((todo) => todo.id !== id),
          };
        }

        return list;
      });
      state.lists = updatedLists;
      updateLocalStorage(updatedLists);
    },
    editTodo: (state, action) => {
      const {
        payload: { listId, id, value },
      } = action;
      const updatedLists = state.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            todos: changeTodoById(id, list.todos, { edit: value }),
          };
        }

        return list;
      });
      state.lists = updatedLists;
      updateLocalStorage(updatedLists);
    },
    confirmEditTodo: (state, action) => {
      const {
        payload: { listId, id, value },
      } = action;

      const updatedLists = state.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            todos: changeTodoById(id, list.todos, {
              title: value,
              edit: false,
            }),
          };
        }

        return list;
      });

      state.lists = updatedLists;
      updateLocalStorage(updatedLists);
    },
    updateAllTodos: (state, action) => {
      const { listId, updatedList } = action.payload;

      const updatedLists = state.lists.map((item) => {
        if (item.id === listId) {
          return {
            ...item,
            todos: updatedList,
          };
        }

        return item;
      });

      state.lists = updatedLists;
      updateLocalStorage(updatedLists);
    },

    // lists

    createList: (state, action) => {
      state.lists.push(action.payload);
    },

    setActiveList: (state, action) => {
      const id = action.payload;

      state.lists = state.lists.map((list) => {
        if (list.id === id) {
          return {
            ...list,
            active: true,
          };
        }

        return {
          ...list,
          active: false,
        };
      });
    },
  },
});

export const {
  getTodos,
  addTodo,
  checkedTodo,
  deleteTodo,
  editTodo,
  confirmEditTodo,
  updateAllTodos,
  createList,
  setActiveList,
} = todoSlice.actions;

export default todoSlice.reducer;
