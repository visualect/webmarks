"use client";

import { Bookmark, Category } from "@prisma/client";
import { useState } from "react";
import SectionSwitcher from "../SectionSwitcher";
import FavoritesSection from "../sections/FavoritesSection";
import LibrarySection from "../sections/LibrarySection";
import Container from "../Container";
import { useMemo } from "react";

interface IBookmarksProps {
  bookmarks: Bookmark[];
  categories: Category[];
}

export default function BookmarksList({
  bookmarks,
  categories,
}: IBookmarksProps) {
  const [section, setSection] = useState<"library" | "favorites">("library");

  const favorites = useMemo(
    () => bookmarks.filter((item) => item.favorite),
    [bookmarks]
  );

  const favoriteSection = (
    <FavoritesSection categories={categories} favorites={favorites} />
  );

  const librarySection = (
    <LibrarySection categories={categories} bookmarks={bookmarks} />
  );

  return (
    <div className="flex-1 w-full mx-0 my-auto gap-4">
      <Container>
        <SectionSwitcher setSection={setSection} selected={section} />
        <div>{section === "library" ? librarySection : favoriteSection}</div>
      </Container>
    </div>
  );
}
