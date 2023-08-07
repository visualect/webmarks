"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { useBookmarkStore, useCategoryStore } from "@/store/store";
import Input from "../Input";
import { Bookmark, Category } from "@prisma/client";
import Select from "react-select";
import Button from "../buttons/Button";
import axios from "axios";
import { PiWarningLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IAddNewBookmarkModalProps {
  categories: Category[];
  bookmarks: Bookmark[];
}

export default function AddNewBookmarkModal({
  categories,
  bookmarks,
}: IAddNewBookmarkModalProps) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { isBookmarkModalActive, closeBookmarkModal } = useBookmarkStore();
  const { openCategoryModal } = useCategoryStore();
  const router = useRouter();

  const categoryOptions = categories.map((category) => {
    return {
      value: category.id,
      label: category.name,
    };
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("api/bookmarks", { url, name, description, category });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      closeBookmarkModal();
      setUrl("");
      setName("");
      setDescription("");
      setCategory("");
      router.refresh();
      toast.success("New bookmark successfully created!");
    }
  };

  const body = (
    <div className="flex flex-col gap-4 w-[500px]">
      <h1 className="font-bold text-center">Create new bookmark</h1>
      <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-500">Paste a URL</p>
          <Input
            value={url}
            placeholder="E.g. https://domain.com/pathname"
            type="text"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-500">Name a bookmark</p>
          <Input
            value={name}
            placeholder="E.g. Overreacted"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-500">Add a short description</p>
          <Input
            value={description}
            placeholder="E.g. Personal blog by creator of Redux"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          {!categories.length ? (
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-500">Choose category</p>
              <p className="flex items-center text-xs text-gray-500">
                <PiWarningLight size={20} color="#6b7280" className="mr-1" />
                Looks like you haven&apos;t any categories yet.
                <span
                  className="text-blue-500 underline px-1 cursor-pointer"
                  onClick={() => {
                    closeBookmarkModal();
                    openCategoryModal();
                  }}
                >
                  Click here
                </span>{" "}
                to create category
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs text-gray-500">Choose a category</p>
              <Select
                options={categoryOptions}
                placeholder="Category"
                onChange={(categoryObj) => setCategory(categoryObj!.label)} // !!!
              />
            </>
          )}
        </div>
        <Button label="Add" style="primary" size="normal" />
      </form>
    </div>
  );
  return (
    <Modal
      body={body}
      isOpen={isBookmarkModalActive}
      onClose={closeBookmarkModal}
    />
  );
}
