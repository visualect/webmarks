"use client";

import { Category } from "@prisma/client";

interface ICategoryTagProps {
  category?: Category;
  all?: boolean;
  selectCategory: (value: string) => void;
}

export default function CategoryTag({
  category,
  all,
  selectCategory,
}: ICategoryTagProps) {
  let name: string;
  let color: string;

  if (category && !all) {
    name = category.name;
    color = category.color;
  } else {
    name = "All";
    color = "blue";
  }

  return (
    <div
      onClick={() => selectCategory(name)}
      className={`bg-blue-500/25 rounded-full min-w-[60px] text-center p-1 cursor-pointer align-middle`}
    >
      <div className={`text-blue-500 font-bold text-xs`}>
        {all ? "All" : `#${name}`}
      </div>
    </div>
  );
}
