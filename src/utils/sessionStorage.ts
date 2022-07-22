import { SESSION_STORAGE_NAME } from '@constants';

export const getSessionStorage = () => {
  return sessionStorage.getItem(SESSION_STORAGE_NAME);
};

export const clearSessionStorage = () => {
  sessionStorage.clear();
};
