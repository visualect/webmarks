"use client";

import { useCategoryStore } from "@/store/store";
import Modal from "./Modal";
import Button from "../buttons/Button";
import { PiWarningLight } from "react-icons/pi";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function DeleteCategoryModal() {
  const isDeleteModalActive = useCategoryStore(
    (store) => store.isDeleteModalActive
  );
  const closeDeleteModal = useCategoryStore((store) => store.closeDeleteModal);

  const params = useSearchParams();
  const router = useRouter();
  const categoryId = params.get("delete_category");

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(`api/categories/${categoryId}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      closeDeleteModal();
      router.push("/", { scroll: false });
      router.refresh();
      toast.success("Category was successfully deleted!");
    }
  };

  const body = (
    <div className="flex flex-col gap-8 items-center w-full">
      <PiWarningLight size={48} className="text-rose-500" />
      <h1 className="text-center">
        By deleting this category{" "}
        <span className="font-semibold">
          you will also delete all notes in this category.
        </span>{" "}
        Are you sure you want to delete this category?
      </h1>
      <div className="flex flex-row gap-4">
        <Button
          label="Cancel"
          size="normal"
          style="alternative"
          action={() => {
            closeDeleteModal();
            router.push("/", { scroll: false });
          }}
        />
        <Button
          label="Delete"
          size="normal"
          style="primary"
          action={handleDeleteCategory}
        />
      </div>
    </div>
  );

  return (
    <Modal
      body={body}
      isOpen={isDeleteModalActive}
      onClose={() => {
        closeDeleteModal();
        router.push("/", { scroll: false });
      }}
    />
  );
}
