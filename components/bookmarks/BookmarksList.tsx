"use client";

import { useState, useContext } from "react";
import SectionSwitcher from "../SectionSwitcher";
import FavoritesSection from "../sections/FavoritesSection";
import LibrarySection from "../sections/LibrarySection";
import Container from "../Container";
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookmarksContext } from "@/providers/BookmarksProvider";
import { CategoriesContext } from "@/providers/CategoriesProvider";

export default function BookmarksList() {
  const [section, setSection] = useState<"library" | "favorites">("library");
  const router = useRouter();

  const bookmarks = useContext(BookmarksContext);
  const categories = useContext(CategoriesContext);

  useEffect(() => {
    router.push("/");
  }, [router]);

  const favorites = useMemo(
    () => bookmarks.filter((item) => item.favorite),
    [bookmarks]
  );

  return (
    <div className="flex-1 w-full mx-0 my-auto gap-4">
      <Container>
        <SectionSwitcher setSection={setSection} selected={section} />
        <div>
          {section === "library" ? (
            <LibrarySection />
          ) : (
            <FavoritesSection favorites={favorites} />
          )}
        </div>
      </Container>
    </div>
  );
}
