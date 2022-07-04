import { initialState as settingsState } from '@features/settingsSlice';
import isEmpty from '@helpers/isEmpty';
import { getLocalStorage } from '@utils/localStorage';
import { STORAGE_LISTS, STORAGE_PERSONAL, STORAGE_SETTINGS } from '@constants';

const setInitialState = (initialState: any, localStorage: any) => {
  return isEmpty(localStorage) ? initialState : localStorage;
};

export const getStorage = () => {
  const lists = getLocalStorage(STORAGE_LISTS);
  const personal = getLocalStorage(STORAGE_PERSONAL);
  const settings = setInitialState(
    settingsState,
    getLocalStorage(STORAGE_SETTINGS)
  );
  return {
    todo: { lists },
    personal,
    settings,
  };
};
