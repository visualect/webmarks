"use client";

import React from "react";

interface IInputErrorMessageProps {
  message: string;
}

export default function InputErrorMessage({
  message,
}: IInputErrorMessageProps) {
  return (
    <p className="text-xs font-bold text-rose-500" role="alert">
      {message}
    </p>
  );
}
