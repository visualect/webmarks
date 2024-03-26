"use client";

interface IInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: "text" | "password" | "number";
}

export default function Input({
  value,
  onChange,
  placeholder,
  type,
}: IInputProps) {
  return (
    <input
      className="w-full sm:w-auto px-4 py-2 border dark:border-neutral-700 rounded-xl focus:outline-none bg-transparent dark:bg-neutral-800"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
}
