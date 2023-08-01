"use client";

interface IMenuItem {
  action: () => void;
  label: string;
}

export default function MenuItem({ label, action }: IMenuItem) {
  return (
    <li
      className="flex p-2 text-sm hover:bg-gray-100 rounded-xl cursor-pointer font-normal"
      onClick={action}
    >
      {label}
    </li>
  );
}
