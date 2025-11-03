import React, { createContext, useContext, useState } from "react";

export interface User {
  fullName: string;
  userName: string;
  email: string;
  age: string;
}
interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuth: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Temporarily set to true for testing - change back to null for production
  const [user, setuser] = useState<User | null>(null);
  const [isAuth, setisAuth] = useState(false);
  const login = (user: User) => {
    setuser(user);
    setisAuth(!!user);
  };
  const logout = () => {
    setuser(null);
  };
  return (
    <UserContext.Provider value={{ user, login, logout, isAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("User Context not found");

  return context;
};
