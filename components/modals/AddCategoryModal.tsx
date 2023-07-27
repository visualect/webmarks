"use client";

import { useState } from "react";
import Input from "../Input";
import Modal from "./Modal";
import colors from "@/utils/colours";
import Button from "../buttons/Button";
import { useModalStore } from "@/store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { colorVariants } from "@/utils/colours";

export default function AddCategoryModal() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const router = useRouter();

  const isOpen = useModalStore((state) => state.isCategoryModalActive);
  const closeCategoryModal = useModalStore((state) => state.closeCategoryModal);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name && !color) return;
    await axios.post("/api/category", { name, color });
    setColor("");
    setName("");
    router.refresh();
  };

  const body = (
    <div className="p-10">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <h1 className="font-semibold text-xl">Create new category</h1>
        <div className="w-full">
          <p className="text-xs text-gray-500 mb-2">Name a new category</p>
          <Input
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>
        <hr />
        <div className="w-full">
          <p className="text-xs text-gray-500 mb-2">Choose a color</p>
          <div className="flex flex-row gap-2 justify-between">
            {colors.map((item) => (
              <div
                className={`${
                  colorVariants[item.value as keyof typeof colorVariants]
                } border rounded-xl p-2 text-sm font-bold cursor-pointer`}
                key={item.label}
                onClick={() => setColor(item.value)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-end gap-2">
          <Button label="Save" style="primary" size="small" />
        </div>
      </form>
    </div>
  );

  return <Modal body={body} isOpen={isOpen} onClose={closeCategoryModal} />;
}
