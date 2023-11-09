"use client";

import { Bookmark } from "@prisma/client";
import { createContext } from "react";

export const BookmarksContext = createContext<Bookmark[]>([]);

interface BookmarksProviderProps {
  children: React.ReactNode;
  value: Bookmark[];
}

export default function BookmarksProvider({
  children,
  value,
}: BookmarksProviderProps) {
  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
}
