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
        !isOpen && "hidden"
      } absolute right-0 top-8 p-2 bg-white rounded-xl border z-20 cursor-default drop-shadow-md`}
    >
      {body}
    </div>
  );
}
