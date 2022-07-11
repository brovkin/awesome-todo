import { STORAGE_LISTS, STORAGE_PERSONAL, STORAGE_SETTINGS } from '@constants';

export const getLocalStorage = (storageName: string) => {
  const json: string | null = localStorage.getItem(storageName);

  if (json) {
    return JSON.parse(json);
  }

  if (storageName === STORAGE_LISTS) {
    return [];
  }

  return {};
};

export const updateLocalStorage = (storageName: string, value: any): void => {
  const json = JSON.stringify(value);
  localStorage.setItem(storageName, json);
};

export const clearLocalStorage = (): void => {
  localStorage.removeItem(STORAGE_PERSONAL);
  localStorage.removeItem(STORAGE_SETTINGS);
  localStorage.removeItem(STORAGE_LISTS);
};
