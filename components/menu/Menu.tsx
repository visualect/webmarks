"use client";

interface IMenuProps {
  isOpen: boolean;
  body: React.ReactNode;
}

export default function Menu({ isOpen, body }: IMenuProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={` ${
        !isOpen
          ? "opacity-0 scale-75 pointer-events-none"
          : "opacity-100 scale-100"
      }
      absolute right-0 top-[110%] p-2 ease-out bg-white rounded-xl border cursor-default shadow-md z-10 transition duration-75`}
    >
      {body}
    </div>
  );
}
