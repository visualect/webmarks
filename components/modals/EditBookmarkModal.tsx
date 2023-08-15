"use client";

import { useBookmarkStore, useCategoryStore } from "@/store/store";
import Modal from "./Modal";
import { PiWarningLight } from "react-icons/pi";
import Button from "../buttons/Button";
import { useEffect, useMemo } from "react";
import { Bookmark, Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import {
  FieldValues,
  useForm,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import NewInput from "../NewInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface isEditModalActiveProps {
  categories: Category[];
  bookmarks: Bookmark[];
}

export default function EditBookmarkModal({
  categories,
  bookmarks,
}: isEditModalActiveProps) {
  const isEditModalActive = useBookmarkStore(
    (state) => state.isEditModalActive
  );
  const closeEditModal = useBookmarkStore((state) => state.closeEditModal);
  const router = useRouter();
  const params = useSearchParams();
  const openCategoryModal = useCategoryStore(
    (state) => state.openCategoryModal
  );

  const {
    register,
    handleSubmit,
    getFieldState,
    reset,
    control,
    setValue,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<FieldValues>();

  const bookmark = useMemo(
    () => bookmarks.find((item) => item.id === params.get("edit_bookmark")),
    [bookmarks, params]
  ) as Bookmark;

  useEffect(() => {
    if (params.get("edit_bookmark") && bookmark) {
      setValue("url", bookmark.url);
      setValue("name", bookmark.name);
      setValue("description", bookmark.description);
      setValue("category", bookmark.category);
    }
    return () => {
      reset();
    };
  }, [bookmark, params, reset, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.patch(`/api/bookmarks/${bookmark.id}`, data);
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
    <div className="flex flex-col gap-8 w-full">
      <h1 className="font-bold text-center">Edit bookmark</h1>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1">
          <NewInput
            register={register}
            required
            name="url"
            placeholder="URL"
            label="URL"
            type="text"
            error={getFieldState("url").error}
          />
        </div>
        <div className="flex flex-col gap-1">
          <NewInput
            register={register}
            required
            name="name"
            placeholder="Name"
            label="Name"
            type="text"
            error={getFieldState("name").error}
          />
        </div>
        <div className="flex flex-col gap-1">
          <NewInput
            register={register}
            required
            name="description"
            placeholder="Description"
            label="Description"
            type="text"
            error={getFieldState("description").error}
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
        <Button
          label="Save changes"
          style="primary"
          size="normal"
          isSumbitting={isSubmitting}
          disabled={isSubmitting || !isDirty || !isValid}
        />
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
