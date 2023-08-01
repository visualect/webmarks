"use client";

import { useRouter } from "next/navigation";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import axios from "axios";
import { toast } from "sonner";

interface IBookmarkMenuProps {
  isOpen: boolean;
  id: string;
  isFavorite: boolean;
}

export default function BookmarkMenu({
  isOpen,
  id,
  isFavorite,
}: IBookmarkMenuProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
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
      await axios.patch(`api/bookmarks/${id}`, { value: true });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      router.refresh();
      toast.success("Bookmark successfully added to favorites!");
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      await axios.patch(`api/bookmarks/${id}`, { value: false });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      router.refresh();
      toast.success("Bookmark successfully removed from favorites!");
    }
  };

  const body = (
    <ul className="flex flex-col gap-2 min-w-[150px]">
      <MenuItem label="Edit" action={() => {}} />
      <MenuItem label="Delete" action={handleDelete} />
      <MenuItem label="Add to favorites" action={handleAddToFavorites} />
      {isFavorite && (
        <MenuItem
          label="Remove from favorites"
          action={handleRemoveFromFavorites}
        />
      )}
    </ul>
  );

  return <Menu isOpen={isOpen} body={body} />;
}
