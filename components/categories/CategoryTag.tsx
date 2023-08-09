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
}

export default function CategoryTag({
  category,
  action,
  editable,
}: ICategoryTagProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categoryRef = useClickOutside(() => {
    setIsDropdownOpen(false);
  });

  const colorVariants = {
    indigo: "bg-indigo-500/5 text-indigo-500 border-indigo-300",
    rose: "bg-rose-500/5 text-rose-500 border-rose-300",
    emerald: "bg-emerald-500/5 text-emerald-500 border-emerald-300",
    amber: "bg-amber-500/5 text-amber-500 border-amber-300",
    fuchsia: "bg-fuchsia-500/5 text-fuchsia-500 border-fuchsia-300",
  };

  return (
    <div
      onClick={action ? () => action(category.name) : undefined}
      className={`${
        colorVariants[category.color as keyof typeof colorVariants]
      } flex flex-row gap-2 items-center justify-center font-bold text-sm rounded-full min-w-[60px] px-2 py-1 cursor-pointer border select-none`}
    >
      {`${category.name}`}
      {editable && (
        <div
          className="relative"
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
