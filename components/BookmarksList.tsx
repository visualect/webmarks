"use client";

import { Bookmark, Category, User } from "@prisma/client";
import Title from "./Title";
import Boomark from "./bookmarks/Boomark";
import Categories from "./categories/Categories";
import { UserWithCategory } from "@/types/types";
import { useState } from "react";

interface IBookmarksProps {
  bookmarks: Bookmark[] | null;
  currentUser: UserWithCategory;
}

export default function BookmarksList({
  bookmarks,
  currentUser,
}: IBookmarksProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const favorites = bookmarks?.filter((item) => item.favorite);
  const filteredBookmarks = bookmarks?.filter(
    (bookmark) => bookmark.category === selectedCategory
  );

  return (
    <div className="py-10">
      <Title label="Favorites" />
      <div className="flex flex-row gap-4 py-8">
        {favorites?.map((bookmark) => (
          <Boomark key={bookmark.id} bookmark={bookmark} size="large" />
        ))}
      </div>
      <Title label="Library" />
      <Categories
        categories={currentUser.categories}
        selectCategory={setSelectedCategory}
      />
      <div className="flex flex-row gap-4 py-8">
        {bookmarks?.map((bookmark) => (
          <Boomark key={bookmark.id} bookmark={bookmark} size="normal" />
        ))}
      </div>
    </div>
  );
}
