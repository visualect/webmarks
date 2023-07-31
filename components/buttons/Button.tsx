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
          ? `px-4 py-2 text-base font-base`
          : `px-2 py-1 text-sm font-base`
      }
      bg-white  
      border-gray-200
      text-black
      border
      rounded-xl
      `}
      disabled={disabled}
      onClick={action}
    >
      {label}
    </button>
  );
}
