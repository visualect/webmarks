"use client";

import getFavicon from "@/actions/getFavicon";
import { Bookmark, Category } from "@prisma/client";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import BookmarkMenu from "../menu/BookmarkMenu";
import { useState } from "react";
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

  const categoryObj = categories.find(
    (item) => item.name === bookmark.category
  ) as Category;

  const borderColorVariants = {
    indigo: "bg-gradient-to-bl from-white via-indigo-50 to-white",
    rose: "bg-gradient-to-bl from-white via-rose-50 to-white",
    emerald: "bg-gradient-to-bl from-white via-emerald-50 to-white",
    amber: "bg-gradient-to-bl from-white via-amber-50 to-white",
    fuchsia: "bg-gradient-to-bl from-white via-fuchsia-50 to-white",
  };

  return (
    <div
      onClick={() => window.open(url, "_blank")}
      className={`
        relative
        flex
        flex-col
        gap-2
        bg-white
        border
        rounded-2xl
        cursor-pointer
        select-none
        hover:shadow-md
        ease-out
        transition
        min-w-[288px]
        group
        ${
          borderColorVariants[
            categoryObj.color as keyof typeof borderColorVariants
          ]
        }
        ${size === "large" ? " p-4" : "px-4 py-3 h-[100px]"}
        `}
    >
      <div className="p-2 bg-white shadow group absolute opacity-0 top-2 right-2 rounded-full group-hover:opacity-100 group-hover:translate-x-5 group-hover:-translate-y-5 transition pointer-events-none">
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
          <div className="relative">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
              className="p-3 hover:bg-gray-100 rounded-full"
              ref={menuRef}
            >
              <BsThreeDotsVertical size={20} />
              <BookmarkMenu
                isOpen={isMenuOpen}
                bookmark={bookmark}
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
      text-gray-500
        `}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
