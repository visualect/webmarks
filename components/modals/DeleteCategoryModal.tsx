"use client";

import { useCategoryStore } from "@/store/store";
import Modal from "./Modal";

export default function DeleteCategoryModal() {
  const { isDeleteModalActive, closeDeleteModal } = useCategoryStore();
  const body = <div>Test</div>;

  return (
    <Modal
      body={body}
      isOpen={isDeleteModalActive}
      onClose={closeDeleteModal}
    />
  );
}
