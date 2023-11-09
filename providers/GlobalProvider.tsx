"use client";

import { Bookmark, Category } from "@prisma/client";
import React from "react";
import BookmarksProvider from "./BookmarksProvider";
import CategoriesProvider from "./CategoriesProvider";

interface GlobalProviderProps {
  bookmarks: Bookmark[];
  categories: Category[];
  children: React.ReactNode;
}

export default function GlobalProvider({
  bookmarks,
  categories,
  children,
}: GlobalProviderProps) {
  return (
    <BookmarksProvider value={bookmarks}>
      <CategoriesProvider value={categories}>{children}</CategoriesProvider>
    </BookmarksProvider>
  );
}
