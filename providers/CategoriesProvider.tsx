"use client";

import { Category } from "@prisma/client";
import { createContext } from "react";

export const CategoriesContext = createContext<Category[]>([]);

interface BookmarksProviderProps {
  children: React.ReactNode;
  value: Category[];
}

export default function CategoriesProvider({
  children,
  value,
}: BookmarksProviderProps) {
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
