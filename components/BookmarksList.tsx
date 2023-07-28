"use client";

import { Bookmark, Category } from "@prisma/client";
import Title from "./Title";
import Boomark from "./bookmarks/Boomark";
import Categories from "./categories/Categories";
import { useState } from "react";
import EmptyState from "./EmptyState";

interface IBookmarksProps {
  bookmarks: Bookmark[];
  categories: Category[];
}

export default function BookmarksList({
  bookmarks,
  categories,
}: IBookmarksProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const favorites = bookmarks.filter((item) => item.favorite);
  const filteredBookmarks =
    selectedCategory === "All"
      ? bookmarks
      : bookmarks?.filter((bookmark) => bookmark.category === selectedCategory);

  return (
    <div className="py-10">
      {favorites.length !== 0 && (
        <>
          <Title label="Favorites" />
          <div className="flex flex-row gap-4 py-8">
            {favorites?.map((bookmark) => (
              <Boomark key={bookmark.id} bookmark={bookmark} size="large" />
            ))}
          </div>
        </>
      )}
      <Title label="Library" />
      <Categories
        categories={categories}
        selectCategory={setSelectedCategory}
      />
      <div className="flex flex-row gap-4 py-8">
        {filteredBookmarks?.length ? (
          filteredBookmarks?.map((bookmark) => (
            <Boomark key={bookmark.id} bookmark={bookmark} size="normal" />
          ))
        ) : (
          <EmptyState
            title="No bookmarks found"
            subtitle="Add new bookmarks to see them here"
          />
        )}
      </div>
    </div>
  );
}
