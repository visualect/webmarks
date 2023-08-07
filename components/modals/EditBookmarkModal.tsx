"use client";

import { useBookmarkStore, useCategoryStore } from "@/store/store";
import Modal from "./Modal";
import Input from "../Input";
import { PiWarningLight } from "react-icons/pi";
import Select from "react-select";
import Button from "../buttons/Button";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Bookmark, Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

interface isEditModalActiveProps {
  categories: Category[];
  bookmarks: Bookmark[];
}

export default function EditBookmarkModal({
  categories,
  bookmarks,
}: isEditModalActiveProps) {
  const { isEditModalActive, closeEditModal } = useBookmarkStore();
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const { openCategoryModal } = useCategoryStore();

  const bookmark = useMemo(
    () => bookmarks.find((item) => item.id === params.get("edit_bookmark")),
    [bookmarks, params]
  ) as Bookmark;

  useEffect(() => {
    if (params.get("edit_bookmark") && bookmark) {
      setUrl(bookmark.url);
      setName(bookmark.name);
      setDescription(bookmark.description);
      setCategory(bookmark.category);
    }
    return () => {
      setUrl("");
      setName("");
      setDescription("");
      setCategory("");
    };
  }, [params, bookmarks, bookmark]);

  const categoryOptions = categories.map((category) => {
    return {
      value: category.id,
      label: category.name,
    };
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/bookmarks/${bookmark.id}`, {
        url,
        name,
        description,
        category,
      });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      closeEditModal();
      router.push("/");
      router.refresh();
      toast.success("Bookmark was successfully updated!");
    }
  };

  const body = (
    <div className="flex flex-col gap-4 w-[500px]">
      <h1 className="font-bold text-center">Edit bookmark</h1>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-500">URL</p>
          <Input
            value={url}
            placeholder="E.g. https://domain.com/pathname"
            type="text"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-500">Name</p>
          <Input
            value={name}
            placeholder="E.g. Overreacted"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-500">Description</p>
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
              <p className="text-xs text-gray-500">Category</p>
              <p className="flex items-center text-xs text-gray-500">
                <PiWarningLight size={20} color="#6b7280" className="mr-1" />
                Looks like you haven&apos;t any categories yet.
                <span
                  className="text-blue-500 underline px-1 cursor-pointer"
                  onClick={() => {
                    closeEditModal();
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
              <p className="text-xs text-gray-500">Category</p>
              <Select
                options={categoryOptions}
                placeholder="Category"
                value={{
                  value: "",
                  label: category,
                }}
                onChange={(categoryObj) => setCategory(categoryObj!.label)} // !!!
              />
            </>
          )}
        </div>
        <Button label="Save changes" style="primary" size="normal" />
      </form>
    </div>
  );

  return (
    <Modal
      body={body}
      isOpen={isEditModalActive}
      onClose={() => {
        closeEditModal();
        router.push("/");
      }}
    />
  );
}
