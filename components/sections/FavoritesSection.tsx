"use client";

import { Bookmark, Category } from "@prisma/client";
import BookmarkItem from "../bookmarks/BookmarkItem";
import Title from "../Title";
import EmptyState from "../EmptyState";

interface IFavoritesSectionProps {
  favorites: Bookmark[];
  categories: Category[];
}

export default function FavoritesSection({
  favorites,
  categories,
}: IFavoritesSectionProps) {
  return (
    <div className="flex flex-col gap-8">
      <Title label="Favorites" />
      <div className="flex flex-col gap-4">
        {favorites.length !== 0 ? (
          favorites.map((bookmark) => (
            <BookmarkItem
              key={bookmark.id}
              bookmark={bookmark}
              categories={categories}
              size="large"
            />
          ))
        ) : (
          <EmptyState
            title="No bookmarks found"
            subtitle="Add bookmark to favorites for diplaying them here"
          />
        )}
      </div>
    </div>
  );
}
