"use client";

import { useState } from "react";
import Input from "../Input";
import Modal from "./Modal";
import Button from "../buttons/Button";
import { useCategoryStore } from "@/store/store";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddCategoryModal() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const router = useRouter();

  const colorVariants = {
    indigo: "bg-indigo-500/5 text-indigo-500 border-indigo-300",
    rose: "bg-rose-500/5 text-rose-500 border-rose-300",
    emerald: "bg-emerald-500/5 text-emerald-500 border-emerald-300",
    amber: "bg-amber-500/5 text-amber-500 border-amber-300",
    fuchsia: "bg-fuchsia-500/5 text-fuchsia-500 border-fuchsia-300",
  };

  const colors = [
    { value: "indigo", label: "Indigo" },
    { value: "emerald", label: "Emarald" },
    { value: "rose", label: "Rose" },
    { value: "amber", label: "Amber" },
    { value: "fuchsia", label: "Fuchsia" },
  ];

  const isOpen = useCategoryStore((state) => state.isCategoryModalActive);
  const closeCategoryModal = useCategoryStore(
    (state) => state.closeCategoryModal
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name && !color) return;
    await axios.post("/api/categories", { name, color });
    setColor("");
    setName("");
    closeCategoryModal();
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
            placeholder="E.g. Books"
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
