"use client";

import { useCategoryStore } from "@/store/store";
import Menu from "./Menu";
import MenuItem from "./MenuItem";

interface ICategoryMenu {
  isOpen: boolean;
}

export default function CategoryMenu({ isOpen }: ICategoryMenu) {
  const { isEditModalActive, openEditModal, openDeleteModal } =
    useCategoryStore();

  const body = (
    <ul className="flex flex-col gap-2 min-w-[50px]">
      <MenuItem label="Edit" action={openEditModal} />
      <MenuItem label="Delete" action={openDeleteModal} />
    </ul>
  );
  return <Menu isOpen={isOpen} body={body} />;
}
