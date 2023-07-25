"use client";

import { useState } from "react";

interface IModal {
  title: String;
  body: React.ReactNode;
  isOpen: boolean;
}

export default function Modal({ title, body, isOpen }: IModal) {
  const [showModal, setShowModal] = useState(isOpen);

  if (!isOpen) return null;

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-transparent backdrop-blur-sm">
      <div className="p-10 bg-gray-100 rounded-xl w-[500px] h-[300px] border">
        <div className="cursor-pointer" onClick={() => setShowModal(false)}>
          Close
        </div>
        <hr />
        <h1>{title}</h1>
        <div>{body}</div>
      </div>
    </div>
  );
}
