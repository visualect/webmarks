"use client";

import { CgSpinner } from "react-icons/cg";

interface IButtonProps {
  label: string;
  action?: () => void;
  disabled?: boolean;
  style: "primary" | "alternative";
  size: "normal" | "small";
  isSumbitting?: boolean;
}

export default function Button({
  label,
  action,
  disabled,
  style,
  size,
  isSumbitting,
}: IButtonProps) {
  return (
    <button
      className={`
      flex
      justify-center
      ${size === "normal"
          ? `px-4 py-2 text-base font-medium min-w-[100px] min-h-[42px] w-fit`
          : `px-2 py-1 text-sm font-base`
        }
      ${style === "primary"
          ? `bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black`
          : `bg-gradient-to-t from-gray-100 to-gray-50 text-gray-800`
        }
      ${disabled
          ? "opacity-75 hover:scale-100 cursor-not-allowed"
          : "hover:scale-105"
        }
      border-gray-200
      border
      dark:border-neutral-700
      rounded-xl
      transition
      duration-100
      ease-out
      w-full

      `}
      disabled={disabled}
      onClick={action}
    >
      {!isSumbitting ? label : <CgSpinner size={24} className="animate-spin" />}
    </button>
  );
}
