"use client";

import { Category } from "@prisma/client";
import CategoryTag from "./CategoryTag";
import { useCategoryStore } from "@/store/store";

interface ICategoriesListProps {
  categories: Category[];
  selectCategory: (value: string) => void;
  selectedCategory: string;
}

export default function CategoriesList({
  categories = [],
  selectCategory,
  selectedCategory,
}: ICategoriesListProps) {
  const openCategoryModal = useCategoryStore(
    (state) => state.openCategoryModal
  );

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div
        onClick={() => selectCategory("All")}
        className={` ${
          selectedCategory === "All" && "shadow-md"
        } flex items-center justify-center bg-transparent border border-black/50 rounded-full min-w-[60px] p-1 cursor-pointer`}
      >
        <div className="font-bold text-sm">All</div>
      </div>
      {categories.map((category) => (
        <CategoryTag
          key={category.id}
          category={category}
          action={selectCategory}
          editable
          selected={category.name === selectedCategory}
        />
      ))}
      <div
        onClick={openCategoryModal}
        className="flex items-center justify-center bg-transparent border border-dashed border-black/50 rounded-full min-w-[60px] p-1 cursor-pointer"
      >
        <div className="font-bold text-sm">Add +</div>
      </div>
    </div>
  );
}
