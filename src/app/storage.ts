import { getLocalStorage } from '@utils/localStorage';
import { STORAGE_LISTS, STORAGE_PERSONAL } from '@constants';

export const getStorage = () => {
  const lists = getLocalStorage(STORAGE_LISTS);
  const personal = getLocalStorage(STORAGE_PERSONAL);
  return {
    todo: { lists },
    personal,
  };
};
