
import { useCategoryStore } from "@/store/store";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import Link from "next/link";

interface ICategoryMenu {
  isOpen: boolean;
  categoryId: string | undefined;
  closeMenu: () => void;
}

export default function CategoryMenu({
  isOpen,
  categoryId,
  closeMenu,
}: ICategoryMenu) {
  const openEditModal = useCategoryStore((store) => store.openEditModal);
  const openDeleteModal = useCategoryStore((store) => store.openDeleteModal);

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
      <Link scroll={false} href={`/?edit_category=${categoryId}`}>
        <MenuItem label="Edit" action={handleEdit} />
      </Link>
      <Link scroll={false} href={`/?delete_category=${categoryId}`}>
        <MenuItem label="Delete" action={handleDelete} />
      </Link>
    </ul>
  );
  return <Menu isOpen={isOpen} body={body} />;
}
