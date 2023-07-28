"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { useBookmarkStore } from "@/store/store";
import Input from "../Input";
import { Category } from "@prisma/client";
import Select from "react-select";

interface IAddNewBookmarkModalProps {
  categories: Category[];
}

export default function AddNewBookmarkModal({
  categories,
}: IAddNewBookmarkModalProps) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const categoryOptions = categories.map((category) => {
    return {
      value: category.id,
      label: category.name,
    };
  });

  const { isBookmarkModalActive, closeBookmarkModal } = useBookmarkStore();
  const body = (
    <div className="flex flex-col gap-4 w-[500px]">
      <h1 className="font-bold text-center">Create new bookmark</h1>
      <form className="flex flex-col gap-4 w-full">
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
          <p className="text-xs text-gray-500">Choose a category</p>
          <Select options={categoryOptions} placeholder="Category" />
        </div>
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
