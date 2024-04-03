"use client";

import { useContext } from "react";
import LibrarySection from "../sections/LibrarySection";
import Container from "../Container";
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookmarksContext } from "@/providers/BookmarksProvider";

export default function BookmarksList() {
  const router = useRouter();

  const bookmarks = useContext(BookmarksContext);

  useEffect(() => {
    router.push("/", { scroll: false });
  }, [router]);

  const favorites = useMemo(
    () => bookmarks.filter((item) => item.favorite),
    [bookmarks]
  );

  return (
    <div className="flex-1 w-full mx-0 my-auto gap-4">
      <Container>
        <LibrarySection />
      </Container>
    </div>
  );
}
