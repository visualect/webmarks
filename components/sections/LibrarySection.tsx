"use client";

import { useState } from "react";
import EmptyState from "../EmptyState";
import Input from "../Input";
import Title from "../Title";
import BookmarkItem from "../bookmarks/BookmarkItem";
import Button from "../buttons/Button";
import CategoriesList from "../categories/Categories";
import { useBookmarkStore } from "@/store/store";
import { Bookmark, Category } from "@prisma/client";
import useFilterBookmarks from "@/hooks/useFilterBookmarks";

interface ILibrarySectionProps {
  categories: Category[];
  bookmarks: Bookmark[];
}

export default function LibrarySection({
  categories,
  bookmarks,
}: ILibrarySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchedValue, setSearchedValue] = useState("");
  const { openBookmarkModal } = useBookmarkStore();

  let displayedBookmarks = useFilterBookmarks(
    bookmarks,
    selectedCategory,
    searchedValue
  );

  return (
    <>
      <Title label="Library" />
      <CategoriesList
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
          subtitle="Add new bookmarks to display them here"
        />
      )}
    </>
  );
}
