"use client"

import { IconType } from "react-icons/lib";

interface IMenuItem {
  action?: () => void;
  label: string;
  disabled?: boolean;
  icon?: IconType;
}

export default function MenuItem({
  label,
  action,
  disabled,
  icon: Icon,
}: IMenuItem) {
  return (
    <li
      className={`${disabled ? "text-gray-500 dark:text-neutral-500" : "text-gray-800 dark:text-white"
        } flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-xl cursor-pointer font-normal`}
      onClick={action && !disabled ? action : undefined}
    >
      {Icon ? (
        <div className="flex flex-row items-center gap-2">
          <Icon size={15} className="text-gray-500" />
          {label}
        </div>
      ) : (
        label
      )}
    </li>
  );
}
