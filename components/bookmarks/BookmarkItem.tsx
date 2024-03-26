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

  const { name, description, url } = bookmark;
  const iconUrl = getFavicon(url);

  const categoryObj = useMemo(
    () => categories.find((item) => item.name === bookmark.category),
    [categories, bookmark.category]
  ) as Category;

  const borderColorVariants = {
    indigo: "via-indigo-50 dark:via-indigo-500/20",
    rose: "via-rose-50 dark:via-rose-500/20",
    emerald: "via-emerald-50 dark:via-emerald-500/20",
    amber: "via-amber-50 dark:via-amber-500/20",
    fuchsia: "via-fuchsia-50 dark:via-fuchsia-500/20",
  };

  return (
    <div
      onClick={() => window.open(url, "_blank")}
      className={`
        relative
        flex
        flex-col
        gap-2
        border
        dark:border-neutral-700
        rounded-2xl
        cursor-pointer
        select-none
        hover:shadow-md
        ease-out
        transition
        min-w-[288px]
        group
        bg-gradient-to-bl
        from-white
        dark:from-neutral-900
        ${borderColorVariants[
        categoryObj.color as keyof typeof borderColorVariants
        ]
        }
        to-white
        dark:to-neutral-900
        ${size === "large" ? " p-4" : "px-4 py-3 h-[100px]"}
        `}
    >
      <div className="p-2 bg-neutral-800 shadow group absolute opacity-0 top-2 right-2 rounded-full group-hover:opacity-100 group-hover:translate-x-5 group-hover:-translate-y-5 transition pointer-events-none">
        <GoLinkExternal />
      </div>
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <Image
            alt="favicon"
            src={iconUrl}
            width={size === "large" ? 40 : 24}
            height={size === "large" ? 40 : 24}
            className="bg-transparent rounded-md"
          />
          <h2
            className={`
        ${size === "large" ? "text-base font-bold" : "text-sm font-semibold"}
        `}
          >
            {name}
          </h2>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <div className="text-xs font-bold">#{categoryObj.name}</div>
          <div className="">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
              className="relative p-3 hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-full transiton duration-100"
              ref={menuRef}
            >
              <BsThreeDotsVertical size={20} />
              <BookmarkMenu
                isOpen={isMenuOpen}
                id={bookmark.id}
                isFavorite={bookmark.favorite}
                closeMenu={() => setIsMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center truncate fade">
        <p
          className={`
        w-full
        ${size === "large" ? "text-sm" : "text-xs"}
      text-gray-500 dark:text-gray-400
        `}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
