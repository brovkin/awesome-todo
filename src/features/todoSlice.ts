import { createSlice, Slice } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  title: string;
  done: boolean;
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
    updateTodo: (state, action) => {
      state.items.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload,
          };
        }

        return item;
      });
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
