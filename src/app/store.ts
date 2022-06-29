import { configureStore } from '@reduxjs/toolkit';
import { personalSlice } from '@features/personalSlice';
import { todoSlice } from '@features/todoSlice';
import { getStorage } from '@app/storage';

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
    personal: personalSlice.reducer,
  },
  preloadedState: getStorage(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
