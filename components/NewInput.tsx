"use client";

import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface IInputProps {
  placeholder: string;
  type: "text" | "password" | "number";
  register: UseFormRegister<FieldValues>;
  required: boolean;
  label: Path<FieldValues>;
  name: Path<FieldValues>;
  error: boolean;
}

export default function NewInput({
  register,
  required,
  label,
  name,
  placeholder,
  type,
  error,
}: IInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-neutral-500" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        {...register(name, { required })}
        className={`
        ${error ? "border-rose-500" : "border-neutral-300"}
        w-full text-sm sm:w-auto px-4 py-2 border rounded-xl focus:outline-none`}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}
