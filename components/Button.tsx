"use client";

interface IButtonProps {
  label: string;
  action: () => void;
  disabled?: boolean;
  style: "primary" | "alternative";
}

export default function Button({
  label,
  action,
  disabled = false,
  style,
}: IButtonProps) {
  return (
    <button
      className="px-4 py-2 bg-slate-800 text-slate-50 border-none rounded-xl"
      disabled={disabled}
      onClick={action}
    >
      {label}
    </button>
  );
}
