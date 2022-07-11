import React, {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useState,
} from 'react';

// interface CreateListProvider {
//   children: JSX.Element | React.ReactNode;
// }
//
// interface CreateListContext {
//   listModal: boolean;
//   setListModal: Dispatch<SetStateAction<boolean>>;
// }

const WelcomeContext = createContext<any | null>(null);

const WelcomeProvider: FC<any> = ({ children }) => {
  // const [listModal, setListModal] = useState<boolean>(false);
  const isAuth = true;
  return (
    <WelcomeContext.Provider value={{ isAuth }}>
      {children}
    </WelcomeContext.Provider>
  );
};

export { WelcomeContext, WelcomeProvider };
