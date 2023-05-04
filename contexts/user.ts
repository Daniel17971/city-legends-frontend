import { useState, createContext} from 'react';

interface User {
    uid: string,
    email: string
}

type UserContextType = null | User;
const UserContext = createContext<UserContextType>(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};