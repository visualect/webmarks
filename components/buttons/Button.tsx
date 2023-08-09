"use client";

interface IButtonProps {
  label: string;
  action?: () => void;
  disabled?: boolean;
  style: "primary" | "alternative";
  size: "normal" | "small";
}

export default function Button({
  label,
  action,
  disabled,
  style,
  size,
}: IButtonProps) {
  return (
    <button
      className={`
      ${
        size === "normal"
          ? `px-4 py-2 text-base font-medium min-w-[100px] w-fit`
          : `px-2 py-1 text-sm font-base`
      }
      ${
        style === "primary"
          ? `bg-gradient-to-t from-gray-800 to-gray-700 text-white`
          : `bg-gradient-to-t from-gray-100 to-gray-50 text-gray-800`
      }
      ${disabled && "opacity-50 hover:scale-100 cursor-not-allowed"}
      bg-white  
      border-gray-200
      border
      rounded-xl
      hover:scale-105
      transition
      duration-100
      ease-out
      w-full
      `}
      disabled={disabled}
      onClick={action}
    >
      {label}
    </button>
  );
}
