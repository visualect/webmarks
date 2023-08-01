"use client";

import { Category } from "@prisma/client";
import { colorVariants } from "@/utils/colours";
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

  return (
    <div
      onClick={action ? () => action(category.name) : undefined}
      className={`${
        colorVariants[category.color as keyof typeof colorVariants]
      } flex flex-row gap-2 items-center justify-between font-bold text-sm rounded-full min-w-[60px] text-center px-2 py-1 cursor-pointer align-middle border`}
    >
      {`#${category.name}`}
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
          <CategoryMenu isOpen={isDropdownOpen} />
        </div>
      )}
    </div>
  );
}
