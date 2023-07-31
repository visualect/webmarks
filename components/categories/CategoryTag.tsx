"use client";

import { Category } from "@prisma/client";
import { colorVariants } from "@/utils/colours";

interface ICategoryTagProps {
  category: Category;
  action?: (value: string) => void;
}

export default function CategoryTag({ category, action }: ICategoryTagProps) {
  return (
    <div
      onClick={action ? () => action(category.name) : undefined}
      className={`${
        colorVariants[category.color as keyof typeof colorVariants]
      } font-bold text-xs rounded-full min-w-[60px] text-center px-4 py-1 cursor-pointer align-middle border`}
    >
      {`#${category.name}`}
    </div>
  );
}
