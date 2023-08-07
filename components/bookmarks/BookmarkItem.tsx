"use client";

import getFavicon from "@/actions/getFavicon";
import { Bookmark, Category } from "@prisma/client";
import Image from "next/image";
import CategoryTag from "../categories/CategoryTag";
import { BsThreeDotsVertical } from "react-icons/bs";
import BookmarkMenu from "../menu/BookmarkMenu";
import { useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

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

  return (
    <div
      onClick={() => window.open(url, "_blank")}
      className={`
        flex
        flex-col
        gap-2
        w-full
        bg-white
        border 
        rounded-2xl
        cursor-pointer
        select-none
        hover:drop-shadow-md
        transition
        ${size === "large" ? "w-[240px] p-4" : "w-[220px] px-4 py-3 h-[100px]"}
        `}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-2">
          <Image
            alt="favicon"
            src={iconUrl}
            width={size === "large" ? 40 : 24}
            height={size === "large" ? 40 : 24}
            className="bg-transparent rounded-md"
          />
          <h2
            className={`
        ${size === "large" ? "text-base font-semibold" : "text-sm font-medium"}
        `}
          >
            {name}
          </h2>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <CategoryTag category={categoryObj} />
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
