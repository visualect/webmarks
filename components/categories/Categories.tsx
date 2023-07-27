"use client";

import { Category } from "@prisma/client";
import CategoryTag from "./CategoryTag";
import { useModalStore } from "@/store/store";

interface ICategoriesListProps {
  categories: Category[];
  selectCategory: (value: string) => void;
}

export default function CategoriesList({
  categories = [],
  selectCategory,
}: ICategoriesListProps) {
  const openCategoryModal = useModalStore((state) => state.openCategoryModal);

  return (
    <div className="flex flex-row gap-2 my-4">
      <div
        onClick={() => selectCategory("All")}
        className="bg-transparent border rounded-full min-w-[60px] text-center p-1 cursor-pointer"
      >
        <div className="font-bold text-xs">All</div>
      </div>
      {categories.map((category) => (
        <CategoryTag
          key={category.id}
          category={category}
          selectCategory={selectCategory}
        />
      ))}
      <div
        onClick={openCategoryModal}
        className="bg-transparent border rounded-full min-w-[60px] text-center p-1 cursor-pointer"
      >
        <div className="font-bold text-xs">Add +</div>
      </div>
    </div>
  );
}
