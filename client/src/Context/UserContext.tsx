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
  isAuth: boolean | null;
  setisAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Temporarily set to true for testing - change back to null for production
  const [user, setuser] = useState<User | null>(null);
  const [isAuth, setisAuth] = useState<boolean | null>(false);

  const login = (user: User) => {
    setuser(user);
    setisAuth(!!user);
    const val = JSON.stringify(user);
    localStorage.setItem("user", val);
  };

  const logout = () => {
    setuser(null);
    localStorage.removeItem("user");
  };
  return (
    <UserContext.Provider value={{ user, login, logout, isAuth, setisAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("User Context not found");

  return context;
};
