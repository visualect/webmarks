"use client";

import { Category } from "@prisma/client";
import CategoryTag from "./CategoryTag";

interface ICategoriesListProps {
  categories: Category[] | null;
  selectCategory: (value: string) => void;
}

export default function CategoriesList({
  categories,
  selectCategory,
}: ICategoriesListProps) {
  return (
    <div className="flex flex-row gap-4 my-4">
      <CategoryTag all selectCategory={selectCategory} />
      {categories?.map((category) => (
        <CategoryTag
          key={category.id}
          category={category}
          selectCategory={selectCategory}
        />
      ))}
      <div
        onClick={() => {}}
        className="bg-transparent border rounded-full min-w-[60px] text-center p-1 cursor-pointer"
      >
        <div className="font-bold text-xs">Add +</div>
      </div>
    </div>
  );
}
