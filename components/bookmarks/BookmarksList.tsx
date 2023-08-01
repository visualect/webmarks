"use client";

import { Bookmark, Category } from "@prisma/client";
import Title from "../Title";
import BookmarkItem from "./BookmarkItem";
import Categories from "../categories/Categories";
import { useState } from "react";
import EmptyState from "../EmptyState";
import Button from "../buttons/Button";
import Input from "../Input";
import { useBookmarkStore } from "@/store/store";

interface IBookmarksProps {
  bookmarks: Bookmark[];
  categories: Category[];
}

export default function BookmarksList({
  bookmarks,
  categories,
}: IBookmarksProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchedValue, setSearchedValue] = useState("");
  const { openBookmarkModal } = useBookmarkStore();

  const favorites = bookmarks.filter((item) => item.favorite);

  const filteredBookmarksByCategory =
    selectedCategory === "All"
      ? bookmarks
      : bookmarks?.filter((bookmark) => bookmark.category === selectedCategory);

  let displayedBookmarks;

  if (searchedValue) {
    displayedBookmarks = filteredBookmarksByCategory.filter(
      (item) =>
        item.name
          .toLocaleLowerCase()
          .includes(searchedValue.toLocaleLowerCase()) ||
        item.description
          .toLocaleLowerCase()
          .includes(searchedValue.toLocaleLowerCase())
    );
  } else {
    displayedBookmarks = filteredBookmarksByCategory;
  }

  return (
    <div className="py-10">
      {favorites.length !== 0 && (
        <>
          <Title label="Favorites" />
          <div className="flex flex-col gap-4 py-8">
            {favorites?.map((bookmark) => (
              <BookmarkItem
                key={bookmark.id}
                bookmark={bookmark}
                categories={categories}
                size="large"
              />
            ))}
          </div>
        </>
      )}
      <Title label="Library" />
      <Categories
        categories={categories}
        selectCategory={setSelectedCategory}
      />
      <div className="flex flex-row items-center justify-between">
        <div>
          <Input
            placeholder="Search"
            value={searchedValue}
            onChange={(e) => setSearchedValue(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <Button
            label="Add bookmark +"
            style="primary"
            size="normal"
            action={() => openBookmarkModal()}
          />
        </div>
      </div>
      {displayedBookmarks?.length ? (
        <div className="grid grid-cols-2 gap-4 py-8">
          {displayedBookmarks?.map((bookmark) => (
            <BookmarkItem
              key={bookmark.id}
              bookmark={bookmark}
              categories={categories}
              size="normal"
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No bookmarks found"
          subtitle="Add new bookmarks to see them here"
        />
      )}
    </div>
  );
}
