import { Slice, createSlice } from '@reduxjs/toolkit';
import {
  deleteFromLocalStorage,
  getLocalStorage,
  saveToLocalStorage,
} from '@utils/localStorage';
import changeTodoById from '../utils/changeTodoById';

export interface Todo {
  id: string;
  title: string;
  done: boolean;
  edit: boolean;
}

interface State {
  items: Todo[];
}

const initialState = { items: [] } as State;

export const todoSlice: Slice<State> = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    getTodos: (state) => {
      state.items = getLocalStorage('todos');
    },
    addTodo: (state, action) => {
      state.items.push(action.payload);
      saveToLocalStorage(action.payload);
    },
    checkedTodo: (state, action) => {
      const id = action.payload;
      const currentItem = state.items.find((item) => item.id === id);
      const value = currentItem?.done;
      state.items = changeTodoById(id, state.items, { done: !value });
    },
    deleteTodo: (state, action) => {
      const payloadId = action.payload;
      state.items = state.items.filter((item) => item.id !== action.payload);
      deleteFromLocalStorage(payloadId);
    },
    editTodo: (state, action) => {
      const {
        payload: { id, value },
      } = action;
      state.items = changeTodoById(id, state.items, { edit: value });
    },
    confirmEditTodo: (state, action) => {
      const {
        payload: { id, value },
      } = action;
      state.items = changeTodoById(id, state.items, {
        title: value,
        edit: false,
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
} = todoSlice.actions;

export default todoSlice.reducer;
