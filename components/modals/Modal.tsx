"use client";

import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

interface IModalProps {
  body: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ body, isOpen, onClose }: IModalProps) {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-30 transition duration-100 ease-out ${
        show
          ? "backdrop-blur-[2px] bg-white/50"
          : "backdrop-blur-[0px] bg-transparent"
      }`}
    >
      <div
        className={`relative flex justify-center items-center p-14 bg-white border rounded-3xl max-w-[600px] ${
          show ? "scale-100 opacity-100" : "scale-75 opacity-0"
        } transition duration-100 ease-out`}
      >
        <IoClose
          size={24}
          className="absolute right-6 top-6 cursor-pointer"
          onClick={() => {
            setShow(false);
            setTimeout(() => {
              onClose();
            }, 100);
          }}
        />
        {body}
      </div>
    </div>
  );
}
