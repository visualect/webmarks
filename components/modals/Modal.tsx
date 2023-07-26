"use client";

import { IoClose } from "react-icons/io5";

interface IModalProps {
  body: React.ReactNode;
  isOpen: boolean;
}

export default function Modal({ body, isOpen }: IModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-10 backdrop-blur-[2px]">
      <div className="relative flex flex-col justify-center items-center w-[500px] h-[300px] p-8 bg-white border rounded-xl">
        <IoClose size={24} className="absolute right-3 top-3 cursor-pointer" />
        {body}
      </div>
    </div>
  );
}
