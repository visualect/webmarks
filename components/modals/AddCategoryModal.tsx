"use client";

import { useState } from "react";
import Input from "../Input";
import Modal from "./Modal";
import colors from "@/utils/colours";
import Button from "../buttons/Button";

export default function AddCategoryModal() {
  const [categoryName, setCategoryName] = useState("");

  const colorVariants = {
    indigo: "bg-indigo-500/20 text-indigo-500 border-indigo-300",
    rose: "bg-rose-500/20 text-rose-500 border-rose-300",
    emerald: "bg-emerald-500/20 text-emerald-500 border-emerald-300",
    amber: "bg-amber-500/20 text-amber-500 border-amber-300",
    fuchsia: "bg-fuchsia-500/20 text-fuchsia-500 border-fuchsia-300",
  };

  const isOpen = true; // Probably add zustand for that
  const body = (
    <div className="p-10">
      <form className="flex flex-col gap-4">
        <h1 className="font-semibold text-xl">Create new category</h1>
        <div className="w-full">
          <p className="text-xs text-gray-500 mb-2">Name a new category</p>
          <Input
            value={categoryName}
            placeholder="Name"
            onChange={(e) => setCategoryName(e.target.value)}
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
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-center gap-2">
          <Button label="Cancel" style="alternative" size="normal" />
          <Button label="Save" style="primary" size="normal" />
        </div>
      </form>
    </div>
  );

  return <Modal body={body} isOpen={isOpen} />;
}
