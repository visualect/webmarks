"use client";

import { useCategoryStore } from "@/store/store";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import Link from "next/link";

interface ICategoryMenu {
  isOpen: boolean;
  categoryId: string;
  closeMenu: () => void;
}

export default function CategoryMenu({
  isOpen,
  categoryId,
  closeMenu,
}: ICategoryMenu) {
  const { openEditModal, openDeleteModal } = useCategoryStore();

  const handleEdit = () => {
    closeMenu();
    openEditModal();
  };

  const handleDelete = () => {
    closeMenu();
    openDeleteModal();
  };

  const body = (
    <ul className="flex flex-col gap-2 min-w-[50px]">
      <Link href={`/?edit_category=${categoryId}`}>
        <MenuItem label="Edit" action={handleEdit} />
      </Link>
      <Link href={`/?delete_category=${categoryId}`}>
        <MenuItem label="Delete" action={handleDelete} />
      </Link>
    </ul>
  );
  return <Menu isOpen={isOpen} body={body} />;
}
