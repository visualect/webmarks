"use client";

import { useRouter } from "next/navigation";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import axios from "axios";
import { toast } from "sonner";
import { useBookmarkStore } from "@/store/store";
import Link from "next/link";
import { useState } from "react";

interface IBookmarkMenuProps {
  isOpen: boolean;
  id: string;
  isFavorite: boolean;
  closeMenu: () => void;
}

export default function BookmarkMenu({
  isOpen,
  id,
  isFavorite,
  closeMenu,
}: IBookmarkMenuProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const openEditModal = useBookmarkStore((state) => state.openEditModal);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      closeMenu();
      await axios.delete(`api/bookmarks/${id}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      router.refresh();
      toast.success("Bookmark successfully deleted!");
    }
  };

  const handleAddToFavorites = async () => {
    try {
      setIsLoading(true);
      closeMenu();
      await axios.patch(`api/bookmarks/${id}`, { favorite: true });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      router.refresh();
      toast.success("Bookmark successfully added to favorites!");
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      setIsLoading(true);
      closeMenu();
      await axios.patch(`api/bookmarks/${id}`, {
        favorite: false,
      });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      router.refresh();
      toast.success("Bookmark successfully removed from favorites!");
    }
  };

  const handleEditBookmark = () => {
    openEditModal();
    closeMenu();
  };

  const body = (
    <ul className="flex flex-col gap-2 min-w-[150px]">
      <Link href={`/?edit_bookmark=${id}`}>
        <MenuItem label="Edit" action={handleEditBookmark} />
      </Link>
      <MenuItem label="Delete" action={handleDelete} />
      {isFavorite ? (
        <MenuItem
          disabled={isLoading}
          label="Remove from favorites"
          action={handleRemoveFromFavorites}
        />
      ) : (
        <MenuItem
          disabled={isLoading}
          label="Add to favorites"
          action={handleAddToFavorites}
        />
      )}
    </ul>
  );

  return <Menu isOpen={isOpen} body={body} />;
}
