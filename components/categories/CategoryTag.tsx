"use client";

import { Category } from "@prisma/client";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useState } from "react";
import CategoryMenu from "../menu/CategoryMenu";
import { useClickOutside } from "@/hooks/useClickOutside";

interface ICategoryTagProps {
  category: Category;
  action?: (value: string) => void;
  editable?: boolean;
  selected: boolean;
}

export default function CategoryTag({
  category,
  action,
  editable,
  selected,
}: ICategoryTagProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categoryRef = useClickOutside(() => {
    setIsDropdownOpen(false);
  });

  const colorVariants = {
    indigo: `${selected ? "bg-indigo-500 text-white border-transparent" : "bg-indigo-500/5 text-indigo-500 border-indigo-300"}`,
    rose: `${selected ? "bg-rose-500 text-white border-transparent" : "bg-rose-500/5 text-rose-500 border-rose-300"}`,
    emerald: `${selected ? "bg-emerald-500 text-white border-transparent" : "bg-emerald-500/5 text-emerald-500 border-emerald-300"}`,
    amber: `${selected ? "bg-amber-500 text-white border-transparent" : "bg-amber-500/5 text-amber-500 border-amber-300"}`,
    fuchsia: `${selected ? "bg-fuchsia-500 text-white border-transparent" : "bg-fuchsia-500/5 text-fuchsia-500 border-fuchsia-300"}`,
  };

  return (
    <div
      onClick={action ? () => action(category.name) : undefined}
      className={`
        relative
        flex
        flex-row
        gap-2
        items-center
        justify-center
        font-bold
        text-sm
        rounded-full
        min-w-[60px]
        px-2
        py-1
        cursor-pointer
        border
        select-none
        ${colorVariants[category.color as keyof typeof colorVariants]}
      `}
    >
      {`${category.name}`}
      {editable && (
        <div
          className="pl-1 border-l border-inherit"
          ref={categoryRef}
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen((prev) => !prev);
          }}
        >
          <PiDotsThreeOutlineVerticalFill size={14} />
          <CategoryMenu
            isOpen={isDropdownOpen}
            categoryId={category.id}
            closeMenu={() => setIsDropdownOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
