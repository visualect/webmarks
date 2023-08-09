"use client";

import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface IInputProps {
  placeholder: string;
  type: "text" | "password" | "number";
  register: UseFormRegister<FieldValues>;
  required: boolean;
  label: Path<FieldValues>;
  name: Path<FieldValues>;
}

export default function NewInput({
  register,
  required,
  label,
  name,
  placeholder,
  type,
}: IInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-neutral-500" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        {...register(name, { required })}
        className="w-full text-sm sm:w-auto px-4 py-2 border rounded-xl focus:outline-none"
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}
