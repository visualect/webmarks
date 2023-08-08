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
      className="w-full sm:w-auto px-4 py-2 border rounded-xl focus:outline-none"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
}
