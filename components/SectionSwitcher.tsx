"use client";

interface ISectionSwitcherProps {
  setSection: (value: "library" | "favorites") => void;
}

export default function SectionSwitcher({ setSection }: ISectionSwitcherProps) {
  return (
    <div className="flex flex-row justify-end items-center gap-2">
      <div
        className="px-4 py-2 rounded-full hover:bg-gray-100 font-medium cursor-pointer transition"
        onClick={() => setSection("library")}
      >
        Library
      </div>
      <div
        className="px-4 py-2 rounded-full hover:bg-gray-100 font-medium cursor-pointer transition"
        onClick={() => setSection("favorites")}
      >
        Favorites
      </div>
    </div>
  );
}
