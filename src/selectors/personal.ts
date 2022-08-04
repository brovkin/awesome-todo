import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@app/store';

export const getPersonal = (state: RootState) => state?.personal;

export const getPersonalInfo = createSelector(
  getPersonal,
  (personal) => personal?.info
);
