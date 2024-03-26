"use client";

import { Bookmark, Category, User } from "@prisma/client";
import React from "react";
import BookmarksProvider from "./BookmarksProvider";
import CategoriesProvider from "./CategoriesProvider";
import CurrentUserProvider from "./CurrentUserProvider";

interface ProvidersProps {
  bookmarks: Bookmark[];
  categories: Category[];
  currentUser: User;
  children: React.ReactNode;
}

export default function Providers({
  bookmarks,
  categories,
  currentUser,
  children,
}: ProvidersProps) {
  return (
    <CurrentUserProvider value={currentUser}>
      <BookmarksProvider value={bookmarks}>
        <CategoriesProvider value={categories}>
          {children}
        </CategoriesProvider>
      </BookmarksProvider>
    </CurrentUserProvider>
  );
}
