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
  disabled = false,
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
      bg-white  
      border-gray-200
      border
      rounded-xl
      hover:scale-105
      transition
      ease-out
      `}
      disabled={disabled}
      onClick={action}
    >
      {label}
    </button>
  );
}
