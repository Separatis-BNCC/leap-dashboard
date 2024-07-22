import { ReactNode, createContext, useContext, useState } from "react";

type TUserTableContextValues = {
  usersUpdatingRoles: number[];
  setUsersUpdatingRoles: React.Dispatch<React.SetStateAction<number[]>>;
};

const UserTableContext = createContext<TUserTableContextValues | null>(null);

export function UserTableProvider({ children }: { children: ReactNode }) {
  // State to keep track of which user's role is being updated
  const [usersUpdatingRoles, setUsersUpdatingRoles] = useState<number[]>([]);

  return (
    <UserTableContext.Provider
      value={{ usersUpdatingRoles, setUsersUpdatingRoles }}
    >
      {children}
    </UserTableContext.Provider>
  );
}

export function useUserTable() {
  const context = useContext(UserTableContext);
  if (!context)
    throw new Error(
      "useUserTable must be used inside of it's Provider's scope"
    );
  return context;
}
