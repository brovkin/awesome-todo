import { Slice, createSlice } from '@reduxjs/toolkit';
import {
  clearLocalStorage,
  getLocalStorage,
  updateLocalStorage,
} from '@utils/localStorage';
import { clearSessionStorage } from '@utils/sessionStorage';
import { STORAGE_LISTS } from '@constants';
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
  lists: TodoList[];
}

const initialState = { lists: [] } as State;

export const todoSlice: Slice<State> = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    getTodos: (state) => {
      state.lists = getLocalStorage(STORAGE_LISTS);
    },
    addTodo: (state, action) => {
      const { listId, newTodo } = action.payload;
      const updatedLists = state.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            todos: [newTodo, ...list.todos],
          };
        }

        return list;
      });
      state.lists = updatedLists;
      updateLocalStorage(STORAGE_LISTS, updatedLists);
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
      updateLocalStorage(STORAGE_LISTS, updatedLists);
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
      updateLocalStorage(STORAGE_LISTS, updatedLists);
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
      updateLocalStorage(STORAGE_LISTS, updatedLists);
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
      updateLocalStorage(STORAGE_LISTS, updatedLists);
    },
    // for dnd
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
      updateLocalStorage(STORAGE_LISTS, updatedLists);
    },

    // lists

    createList: (state, action) => {
      const newList = action.payload;
      const allLists = [...state.lists, newList];
      state.lists = allLists;
      updateLocalStorage(STORAGE_LISTS, allLists);
    },

    setActiveList: (state, action) => {
      const id = action.payload;
      const updatedLists = state.lists.map((list) => {
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

      state.lists = updatedLists;
      updateLocalStorage(STORAGE_LISTS, updatedLists);
    },

    deleteList: (state, action) => {
      const id = action.payload;
      const foundList = state.lists.find((list) => list.id === id);
      const updatedLists = state.lists
        .filter((list) => list.id !== id)
        .map((list, idx) => {
          if (idx === 0 && foundList?.active === true) {
            return {
              ...list,
              active: true,
            };
          }

          return list;
        });

      state.lists = updatedLists;
      updateLocalStorage(STORAGE_LISTS, updatedLists);
    },

    editList: (state, action) => {
      const { id, data } = action.payload;
      const updatedLists = state.lists.map((list) => {
        if (list.id === id) {
          return {
            ...list,
            ...data,
          };
        }

        return list;
      });

      state.lists = updatedLists;
      updateLocalStorage(STORAGE_LISTS, updatedLists);
    },

    clearAll: (state) => {
      state.lists = [];
      clearLocalStorage();
      clearSessionStorage();
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
  clearAll,
  deleteList,
  editList,
} = todoSlice.actions;

export default todoSlice.reducer;
