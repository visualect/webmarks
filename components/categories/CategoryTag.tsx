"use client";

import { useState } from "react";
import CategoryMenu from "../menu/CategoryMenu";
import { useClickOutside } from "@/hooks/useClickOutside";
import Favorites from "../Favorites";

// type Colors = 'default' | 'indigo' | 'rose' | 'emerald' | 'amber' | 'fuchsia';

interface ICategoryTagProps {
  label: string;
  color: string;
  id?: string;
  action?: (value: string) => void;
  editable?: boolean;
  selected?: boolean;
  small?: boolean;
}

export default function CategoryTag({
  label,
  color,
  id,
  action,
  editable,
  selected,
  small
}: ICategoryTagProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const categoryRef = useClickOutside(() => {
    setIsDropdownOpen(false);
  });

  const colorVariants = {
    default: `${selected ? "bg-black dark:bg-white text-white dark:text-black border-transparent" : "bg-transparent border-black dark:border-white border-dashed text-black dark:text-white"}`,
    favorites: `${selected ? "bg-black dark:bg-white text-white dark:text-black border-transparent" : "bg-transparent border-black dark:border-white border-dotted text-black dark:text-white"}`,
    indigo: `${selected ? "bg-indigo-500 text-white border-transparent" : "bg-indigo-500/5 text-indigo-500 border-indigo-300"}`,
    rose: `${selected ? "bg-rose-500 text-white border-transparent" : "bg-rose-500/5 text-rose-500 border-rose-300"}`,
    emerald: `${selected ? "bg-emerald-500 text-white border-transparent" : "bg-emerald-500/5 text-emerald-500 border-emerald-300"}`,
    amber: `${selected ? "bg-amber-500 text-white border-transparent" : "bg-amber-500/5 text-amber-500 border-amber-300"}`,
    fuchsia: `${selected ? "bg-fuchsia-500 text-white border-transparent" : "bg-fuchsia-500/5 text-fuchsia-500 border-fuchsia-300"}`,
  };

  let timeout: NodeJS.Timeout;

  return (
    <div
      ref={categoryRef}
      onClick={action ? () => action(label) : undefined}
      onContextMenu={(e) => {
        if (editable) {
          e.preventDefault()
          setIsDropdownOpen(true)
          return
        }
      }}
      onTouchStart={() => {
        timeout = setTimeout(() => {
          setIsDropdownOpen(true)
        }, 500)
      }}
      onTouchEnd={() => {
        clearTimeout(timeout)
      }}
      className={`
        relative
        flex
        flex-row
        gap-2
        items-center
        justify-center
        font-semibold
        min-w-[60px]
        px-2
        py-1
        rounded-lg
        cursor-pointer
        border
        select-none
        ${colorVariants[color as keyof typeof colorVariants]}
        ${small ? 'text-xs' : 'text-sm'}
      `}
    >
      {`${label}`}
      <CategoryMenu
        isOpen={isDropdownOpen}
        categoryId={id}
        closeMenu={() => setIsDropdownOpen(false)}
      />
    </div>
  );
}
