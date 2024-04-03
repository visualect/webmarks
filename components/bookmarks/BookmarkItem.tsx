"use client"

import getFavicon from "@/actions/getFavicon";
import { Bookmark, Category } from "@prisma/client";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import BookmarkMenu from "../menu/BookmarkMenu";
import { useMemo, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { GoLinkExternal } from "react-icons/go";

interface IBookmarkProps {
  bookmark: Bookmark;
  categories: Category[];
  size: "large" | "normal";
}

export default function BookmarkItem({
  bookmark,
  size,
  categories,
}: IBookmarkProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let menuRef = useClickOutside(() => {
    setIsMenuOpen(false);
  });

  const { name, description, url, id, favorite } = bookmark;
  const iconUrl = getFavicon(url);

  const categoryObj = useMemo(
    () => categories.find((item) => item.name === bookmark.category),
    [categories, bookmark.category]
  ) as Category;

  const colorVariants = {
    indigo: "via-indigo-50 dark:via-indigo-500/20",
    rose: "via-rose-50 dark:via-rose-500/20",
    emerald: "via-emerald-50 dark:via-emerald-500/20",
    amber: "via-amber-50 dark:via-amber-500/20",
    fuchsia: "via-fuchsia-50 dark:via-fuchsia-500/20",
  };

  return (
    <div className="flex flex-row w-full min-w-0 items-center">
      {/* Clickable link area */}
      <div
        className={`
          flex
          flex-col
          w-full
          min-w-0
          p-2
          gap-1
          text-xs
          bg-gradient-to-bl
          from-white
          dark:from-neutral-900
          ${colorVariants[categoryObj.color as keyof typeof colorVariants]}
          to-white
          dark:to-neutral-900
          border
          border-r-0
          rounded-bl-xl
          rounded-tl-xl
          cursor-pointer
          group
        `}
        onClick={() => window.open(url, '_blank')}
      >
        <div className="relative flex flew-row items-center gap-2">
          <div className="
            absolute
            opacity-0
            group-hover:opacity-100
            group-hover:-translate-y-0
            -translate-y-5
            transition
            top-0
            left-0
            p-1
            rounded-md
            border
            z-10
            pointer-events-none
            bg-transparent
            border-none
          ">
            <GoLinkExternal size={14} />
          </div>
          <Image
            alt="favicon"
            src={iconUrl}
            width={size === "large" ? 40 : 24}
            height={size === "large" ? 40 : 24}
            className="bg-transparent rounded-md group-hover:opacity-0 group-hover:translate-y-5 transition"
          />
          <h2 className="font-bold truncate">
            {name}
          </h2>
        </div>
        <div className="text-[11px] text-neutral-500 truncate">
          {description}
        </div>
      </div>
      {/* Options */}
      <div
        className="relative flex justify-center items-center h-full w-10 bg-white dark:bg-[#151515] hover:bg-neutral-100 dark:hover:bg-neutral-800 border rounded-tr-xl rounded-br-xl cursor-pointer"
        ref={menuRef}
        onClick={() => setIsMenuOpen(prev => !prev)}
      >
        <BsThreeDotsVertical />
        <BookmarkMenu isOpen={isMenuOpen} id={id} closeMenu={() => setIsMenuOpen(false)} isFavorite={favorite} />
      </div>
    </div>
  )
}
