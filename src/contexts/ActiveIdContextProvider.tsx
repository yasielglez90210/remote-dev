import React, { createContext } from "react";
import { useActiveId } from "../lib/hooks";

type TActiveIdContext = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<TActiveIdContext | null>(null);

type ActiveIdContextProviderProps = {
  children: React.ReactNode;
};

export default function ActiveIdContextProvider({
  children,
}: ActiveIdContextProviderProps) {
  const activeId = useActiveId();

  return (
    <ActiveIdContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}
