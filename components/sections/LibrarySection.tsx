"use client";

import { useContext, useMemo, useState } from "react";
import EmptyState from "../EmptyState";
import Input from "../Input";
import Title from "../Title";
import BookmarkItem from "../bookmarks/BookmarkItem";
import Button from "../buttons/Button";
import CategoriesList from "../categories/Categories";
import { useBookmarkStore } from "@/store/store";
import { Bookmark, Category } from "@prisma/client";
import useFilterBookmarks from "@/hooks/useFilterBookmarks";
import { BookmarksContext } from "@/providers/BookmarksProvider";
import { CategoriesContext } from "@/providers/CategoriesProvider";

export default function LibrarySection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchedValue, setSearchedValue] = useState("");
  const { openBookmarkModal } = useBookmarkStore();

  const bookmarks = useContext(BookmarksContext);
  const categories = useContext(CategoriesContext);

  let filteredBookmarks = useFilterBookmarks(
    bookmarks,
    selectedCategory,
    searchedValue
  );

  const displayedBookmarks = useMemo(() => {
    return filteredBookmarks.map((bookmark) => (
      <BookmarkItem
        key={bookmark.id}
        bookmark={bookmark}
        categories={categories}
        size="normal"
      />
    ));
  }, [filteredBookmarks, categories]);

  return (
    <div className="flex flex-col gap-8">
      <Title label="Library" />
      <CategoriesList
        categories={categories}
        selectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-8">
        <div className="w-full sm:w-auto">
          <Input
            placeholder="Search"
            value={searchedValue}
            onChange={(e) => setSearchedValue(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <Button
            label="New bookmark"
            style="primary"
            size="normal"
            action={openBookmarkModal}
          />
        </div>
      </div>
      {displayedBookmarks.length !== 0 ? (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
          {displayedBookmarks}
        </div>
      ) : (
        <EmptyState title="No bookmarks found" />
      )}
    </div>
  );
}
