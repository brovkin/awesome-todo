import { createSlice, Slice } from '@reduxjs/toolkit';
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
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    checkedTodo: (state, action) => {
      const id = action.payload;
      const currentItem = state.items.find((item) => item.id === id);
      const value = currentItem?.done;
      state.items = changeTodoById(id, state.items, { done: !value });
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
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

export const { addTodo, checkedTodo, deleteTodo, editTodo, confirmEditTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
