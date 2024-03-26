import { Category } from "@prisma/client";
import CategoryTag from "./CategoryTag";
import { useCategoryStore } from "@/store/store";
import { useMemo } from "react";

interface ICategoriesListProps {
  categories: Category[];
  selectCategory: (value: string) => void;
  selectedCategory: string;
}

export default function Categories({
  categories = [],
  selectCategory,
  selectedCategory,
}: ICategoriesListProps) {
  const openCategoryModal = useCategoryStore(
    (state) => state.openCategoryModal
  );

  const displayedCategories = useMemo(() => {
    return categories.map((category) => (
      <CategoryTag
        key={category.id}
        category={category}
        action={selectCategory}
        editable
        selected={category.name === selectedCategory}
      />
    ));
  }, [categories, selectedCategory, selectCategory]);

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div
        onClick={() => selectCategory("All")}
        className={` ${selectedCategory === "All" && "shadow-md bg-black dark:bg-white text-white dark:text-black"
          } flex items-center justify-center border border-black/50 dark:border-white rounded-full min-w-[60px] p-1 cursor-pointer`}
      >
        <div className="font-bold text-sm">All</div>
      </div>
      {displayedCategories}
      <div
        onClick={openCategoryModal}
        className="flex items-center justify-center bg-transparent border border-dashed border-black/50 dark:border-white rounded-full min-w-[60px] p-1 cursor-pointer"
      >
        <div className="font-bold text-sm">Add +</div>
      </div>
    </div>
  );
}
