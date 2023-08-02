import { Bookmark } from "@prisma/client";

export default function useFilterBookmarks(
  bookmarks: Bookmark[],
  selectedCategory: string,
  searchedValue: string
) {
  let displayedBookmarks;

  const filteredBookmarksByCategory =
    selectedCategory === "All"
      ? bookmarks
      : bookmarks?.filter((bookmark) => bookmark.category === selectedCategory);

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
