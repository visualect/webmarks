"use client";

import getFavicon from "@/actions/getFavicon";
import { Bookmark } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface IBookmarkProps {
  bookmark: Bookmark;
  size: "large" | "normal";
}

export default function Boomark({ bookmark, size }: IBookmarkProps) {
  const { name, description, url } = bookmark;
  const iconUrl = getFavicon(url);

  return (
    <Link
      target="_blank"
      href={url}
      className={`
        flex
        flex-col
        gap-2
        bg-white
        border 
        rounded-xl
        cursor-pointer
        ${size === "large" ? "w-[240px] p-4" : "w-[220px] p-3"}
        `}
    >
      <div className="flex flex-row items-center gap-4">
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
      <hr />
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
    </Link>
  );
}
