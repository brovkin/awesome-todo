import { useEffect, useState } from 'react';
import isEmpty from '@helpers/isEmpty';
import { getLocalStorage } from '@utils/localStorage';
import { STORAGE_PERSONAL } from '@constants';

const useAuth = () => {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const personal = getLocalStorage(STORAGE_PERSONAL);

    if (!isEmpty(personal)) {
      setAuth(true);
    }
  }, []);

  return [isAuth, setAuth];
};

export default useAuth;
