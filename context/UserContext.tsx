import React, { createContext, useContext, useState } from "react";

type UserType = {
  name: string;
  email: string;
  role: string;
  phone: string;
  emailverified: boolean;
  isanonymous: boolean;
  profilePicture: string;
} | null;

type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{
  children: React.ReactNode;
  initialUser?: UserType;
}> = ({ children, initialUser = null }) => {
  const [user, setUser] = useState<UserType>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};