"use client";

import {
  UseFormRegister,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";

interface IInputProps {
  placeholder: string;
  type: "text" | "password" | "number";
  register: UseFormRegister<FieldValues>;
  required: boolean;
  label: Path<FieldValues>;
  name: Path<FieldValues>;
  error: FieldError | undefined;
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
        ${error ? "border-rose-500" : "border-neutral-200"}
        w-full text-sm sm:w-auto px-4 py-2 border dark:border-neutral-700 rounded-xl focus:outline-none bg-transparent dark:bg-neutral-800`}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}
