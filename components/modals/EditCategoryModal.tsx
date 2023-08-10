"use client";

import { useEffect, useMemo, useState } from "react";
import Input from "../Input";
import Modal from "./Modal";
import Button from "../buttons/Button";
import { useCategoryStore } from "@/store/store";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Category } from "@prisma/client";

interface IEditCategoryModalProps {
  categories: Category[];
}

export default function EditCategoryModal({
  categories,
}: IEditCategoryModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const currentCategoryId = params.get("edit_category");

  const category = useMemo(() => {
    return categories.find((item) => item.id === currentCategoryId);
  }, [categories, currentCategoryId]);

  useEffect(() => {
    if (currentCategoryId && category) {
      setName(category.name);
      setColor(category.color);
    }
    return () => {
      setName("");
      setColor("");
    };
  }, [currentCategoryId, category]);

  const { isEditModalActive: isOpen, closeEditModal } = useCategoryStore();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!name && !color) return;
      await axios.patch(`/api/categories/${currentCategoryId}`, {
        name,
        color,
      });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      closeEditModal();
      router.push("/");
      router.refresh();
      toast.success("Category was successfully updated!");
    }
  };

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

  const body = (
    <div className="p-10">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <h1 className="font-semibold text-xl">Edit category</h1>
        <div className="w-full">
          <p className="text-xs text-gray-500 mb-2">Name</p>
          <Input
            value={name}
            placeholder="E.g. Books"
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>
        <hr />
        <div className="w-full">
          <p className="text-xs text-gray-500 mb-2">Color</p>
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
          <Button label="Save changes" style="primary" size="small" />
        </div>
      </form>
    </div>
  );

  return (
    <Modal
      body={body}
      isOpen={isOpen}
      onClose={() => {
        closeEditModal();
        router.push("/");
      }}
    />
  );
}
