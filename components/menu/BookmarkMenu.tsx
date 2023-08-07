"use client";

import { useRouter } from "next/navigation";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import axios from "axios";
import { toast } from "sonner";
import { useBookmarkStore } from "@/store/store";
import Link from "next/link";
import { Bookmark } from "@prisma/client";

interface IBookmarkMenuProps {
  isOpen: boolean;
  bookmark: Bookmark;
  closeMenu: () => void;
}

export default function BookmarkMenu({
  isOpen,
  bookmark,
  closeMenu,
}: IBookmarkMenuProps) {
  const router = useRouter();

  const { id, favorite: isFavorite } = bookmark;

  const { openEditModal } = useBookmarkStore();

  const handleDelete = async () => {
    try {
      closeMenu();
      await axios.delete(`api/bookmarks/${id}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      router.refresh();
      toast.success("Bookmark successfully deleted!");
    }
  };

  const handleAddToFavorites = async () => {
    try {
      closeMenu();
      await axios.patch(`api/bookmarks/${id}`, { favorite: true });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      router.refresh();
      toast.success("Bookmark successfully added to favorites!");
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      closeMenu();
      await axios.patch(`api/bookmarks/${id}`, {
        favorite: false,
      });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
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
          label="Remove from favorites"
          action={handleRemoveFromFavorites}
        />
      ) : (
        <MenuItem label="Add to favorites" action={handleAddToFavorites} />
      )}
    </ul>
  );

  return <Menu isOpen={isOpen} body={body} />;
}
