import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@app/store';

export const getTodo = (state: RootState) => state?.todo;

export const getTodoLists = createSelector(
  getTodo,
  (todo) => todo?.lists || []
);
