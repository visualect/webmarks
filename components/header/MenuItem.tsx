"use client";

interface IMenuItem {
  action: () => void;
  label: string;
}

export default function MenuItem({ label, action }: IMenuItem) {
  return (
    <div className="p-2 text-sm hover:bg-gray-100 rounded-xl" onClick={action}>
      {label}
    </div>
  );
}
