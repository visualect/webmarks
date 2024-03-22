"use client";

import { User } from "@prisma/client";
import { createContext } from "react";

export const CurrentUserContext = createContext<User | null>(null);

interface CurrentUserProviderProps {
  children: React.ReactNode;
  value: User;
}

export default function CurrentUserProvider({
  children,
  value,
}: CurrentUserProviderProps) {
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}

