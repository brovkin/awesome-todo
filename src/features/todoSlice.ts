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
    checkedTodo: (state, action) => {
      state.items.map((item) => {
        const payloadId = action.payload;
        if (item.id === payloadId) {
          return {
            ...item,
            done: !item.done,
          };
        }

        return item;
      });
    },
  },
});

export const { addTodo, checkedTodo } = todoSlice.actions;

export default todoSlice.reducer;
