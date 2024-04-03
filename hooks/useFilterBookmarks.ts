import { Bookmark } from "@prisma/client";
import { useMemo } from "react";

export default function useFilterBookmarks(
  bookmarks: Bookmark[],
  selectedCategory: string,
  searchedValue: string
) {
  let displayedBookmarks;

  const filteredBookmarksByCategory = useMemo(
    () => {
      if (selectedCategory === 'all') {
        return bookmarks
      } else if (selectedCategory === 'favorites') {
        return bookmarks?.filter(b => b.favorite)
      } else {
        return bookmarks?.filter(b => b.category === selectedCategory)
      }
    },
    [bookmarks, selectedCategory]
  );

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

  return displayedBookmarks;
}
