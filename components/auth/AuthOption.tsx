"use client";

import { IconType } from "react-icons/lib";

interface IAuthOptionProps {
  icon: IconType;
  action: () => void;
  providerName: string;
}

export default function AuthOption({
  icon: Icon,
  action,
  providerName,
}: IAuthOptionProps) {
  return (
    <div
      onClick={action}
      className="flex flex-row items-center justify-center gap-2 px-4 py-2 border rounded-xl cursor-pointer hover:scale-105
      transition
      duration-100
      ease-out"
    >
      <Icon size={24} />
      <p className="text-sm font-medium">Sign in with {providerName}</p>
    </div>
  );
}
