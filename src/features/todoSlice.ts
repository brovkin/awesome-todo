import { createSlice, Slice } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  title: string;
  done: boolean;
  edit: boolean;
}

interface State {
  items: Todo[];
}

const mock = [
  { id: 'tesdf23423', title: 'hello world', done: false, edit: false },
];

const initialState = { items: mock } as State;

export const todoSlice: Slice<State> = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    checkedTodo: (state, action) => {
      state.items = state.items.map((item) => {
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
    deleteTodo: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    editTodo: (state, action) => {
      const {
        payload: { id, value },
      } = action;
      state.items = state.items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            edit: value,
          };
        }

        return item;
      });
    },
    confirmEditTodo: (state, action) => {
      const {
        payload: { id, value },
      } = action;
      state.items = state.items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title: value,
            edit: false,
          };
        }

        return item;
      });
    },
    // updateTodo: (state, action) => {
    //   const {
    //     payload: { id, fields },
    //   } = action;
    //
    //   state.items = state.items.map((item) => {
    //     if (item.id === id) {
    //       console.log('value', fields);
    //       const fields;
    //       return {
    //         ...item,
    //         ...fields,
    //       };
    //     }
    //
    //     return item;
    //   });
    // },
  },
});

export const { addTodo, checkedTodo, deleteTodo, editTodo, confirmEditTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
