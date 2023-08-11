"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useBookmarkStore, useCategoryStore } from "@/store/store";
import Input from "../Input";
import { Bookmark, Category } from "@prisma/client";
import Button from "../buttons/Button";
import axios from "axios";
import { PiWarningLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import NewInput from "../NewInput";

interface IAddNewBookmarkModalProps {
  categories: Category[];
  bookmarks: Bookmark[];
}

export default function AddNewBookmarkModal({
  categories,
  bookmarks,
}: IAddNewBookmarkModalProps) {
  const { isBookmarkModalActive, closeBookmarkModal } = useBookmarkStore();
  const { openCategoryModal } = useCategoryStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.post("api/bookmarks", data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      closeBookmarkModal();
      reset();
      router.refresh();
      toast.success("New bookmark successfully created!");
    }
  };

  const body = (
    <div className="flex flex-col gap-8 w-[500px]">
      <h1 className="font-bold text-center">Create new bookmark</h1>
      <form
        className="flex flex-col gap-6 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1">
          <NewInput
            register={register}
            label="Paste a URL"
            type="text"
            name="url"
            placeholder="URL"
            required
            error={!!errors.url?.message}
          />
        </div>
        <div className="flex flex-col gap-1">
          <NewInput
            register={register}
            label="Name a bookmark"
            type="text"
            name="name"
            placeholder="Name"
            required
            error={!!errors.name?.message}
          />
        </div>
        <div className="flex flex-col gap-1">
          <NewInput
            register={register}
            label="Add a short description"
            type="text"
            name="description"
            placeholder="Description"
            required
            error={!!errors.description?.message}
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
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full text-sm rounded-xl px-4 py-2 ring-0 ring-offset-0 focus:ring-offset-0 focus:ring-0">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {categories.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.name}
                          className="rounded-xl"
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </>
          )}
        </div>
        <div className="flex justify-center">
          <Button
            label="Create"
            style="primary"
            size="normal"
            isSumbitting={isSubmitting}
            disabled={isSubmitting || !isValid || !isDirty}
          />
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
