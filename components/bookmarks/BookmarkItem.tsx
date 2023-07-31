"use client";

import getFavicon from "@/actions/getFavicon";
import { Bookmark, Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import CategoryTag from "../categories/CategoryTag";
import { BsThreeDotsVertical } from "react-icons/bs";

interface IBookmarkProps {
  bookmark: Bookmark;
  categories: Category[];
  size: "large" | "normal";
}

export default function Bookmark({
  bookmark,
  size,
  categories,
}: IBookmarkProps) {
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
        rounded-xl
        cursor-pointer
        ${size === "large" ? "w-[240px] p-4" : "w-[220px] p-3"}
        `}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-2">
          <Image
            alt="favicon"
            src={iconUrl}
            width={size === "large" ? 40 : 24}
            height={size === "large" ? 40 : 24}
            className="bg-transparent rounded-full"
          />
          <h2
            className={`
        ${size === "large" ? "text-base font-semibold" : "text-sm font-medium"}
        `}
          >
            {name}
          </h2>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <CategoryTag category={categoryObj} />
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <BsThreeDotsVertical size={20} />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center">
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
