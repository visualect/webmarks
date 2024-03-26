"use client";

interface ISectionSwitcherProps {
  setSection: (value: "library" | "favorites") => void;
  selected: string;
}

export default function SectionSwitcher({
  setSection,
  selected,
}: ISectionSwitcherProps) {
  return (
    <div className="flex flex-row justify-end items-center gap-2 mb-8 md:mb-0">
      <div
        className={`
        ${selected === "library"
            ? "underline underline-offset-8"
            : "no-underline"
          }
         px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 font-medium cursor-pointer transition ease-out duration-100`}
        onClick={() => setSection("library")}
      >
        Library
      </div>
      <div
        className={`
        ${selected === "favorites"
            ? "underline underline-offset-8"
            : "no-underline"
          }
        px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 font-medium cursor-pointer transition ease-out duration-100`}
        onClick={() => setSection("favorites")}
      >
        Favorites
      </div>
    </div>
  );
}
