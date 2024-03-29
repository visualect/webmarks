import { Category } from "@prisma/client";
import CategoryTag from "./CategoryTag";
import { useCategoryStore } from "@/store/store";
import { useMemo } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

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
        small
        editable
        key={category.id}
        label={category.name}
        color={category.color}
        action={selectCategory}
        selected={category.name === selectedCategory}
        id={category.id}
      />
    ));
  }, [categories, selectedCategory, selectCategory]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1 items-center text-gray-500 text-[11px]">
        <AiOutlineInfoCircle size={14} />
        <span>
          Right click to edit or delete category
        </span>
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        <CategoryTag small label="All" color="default" selected={selectedCategory === 'All'} action={() => selectCategory('All')} />
        {displayedCategories}
        <CategoryTag small label="Add" color="default" action={openCategoryModal} />
      </div>
    </div>
  );
}
