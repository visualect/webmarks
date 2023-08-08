"use client";

import { IoClose } from "react-icons/io5";

interface IModalProps {
  body: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ body, isOpen, onClose }: IModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-30 backdrop-blur-[2px]">
      <div
        className={`relative flex flex-col justify-center items-center p-10 bg-white border rounded-xl max-w-[600px] ${
          isOpen ? "opacity-100" : "opacity-0"
        } transition duration-100`}
      >
        <IoClose
          size={24}
          className="absolute right-3 top-3 cursor-pointer"
          onClick={onClose}
        />
        {body}
      </div>
    </div>
  );
}
