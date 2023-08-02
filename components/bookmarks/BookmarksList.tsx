"use client";

import { Bookmark, Category } from "@prisma/client";
import { useState } from "react";
import SectionSwitcher from "../SectionSwitcher";
import FavoritesSection from "../sections/FavoritesSection";
import LibrarySection from "../sections/LibrarySection";

interface IBookmarksProps {
  bookmarks: Bookmark[];
  categories: Category[];
}

export default function BookmarksList({
  bookmarks,
  categories,
}: IBookmarksProps) {
  const [section, setSection] = useState<"library" | "favorites">("library");

  const favorites = bookmarks.filter((item) => item.favorite);

  const favoriteSection = (
    <FavoritesSection categories={categories} favorites={favorites} />
  );

  const librarySection = (
    <LibrarySection categories={categories} bookmarks={bookmarks} />
  );

  return (
    <div className="py-10">
      <SectionSwitcher setSection={setSection} />
      {section === "library" ? librarySection : favoriteSection}
    </div>
  );
}
