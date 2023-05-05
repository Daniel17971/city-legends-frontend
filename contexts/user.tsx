import { useState, createContext} from 'react';

type UserContextProviderProps = {
  children: React.ReactNode
}

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }:UserContextProviderProps) => {

  const [userEmail, setUserEmail] = useState<'string' | null>(null);
  const [uid, setUid] = useState<'string' | null>(null);

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail, uid, setUid }}>
      {children}
    </UserContext.Provider>
  );
};