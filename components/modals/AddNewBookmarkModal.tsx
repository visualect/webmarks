"use client";

import Modal from "./Modal";
import { useBookmarkStore, useCategoryStore } from "@/store/store";
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
import isValidUrl from "@/utils/isValidUrl";
import InputErrorMessage from "../InputErrorMessage";
import { useContext } from "react";
import { CategoriesContext } from "@/providers/CategoriesProvider";

export default function AddNewBookmarkModal() {
  const categories = useContext(CategoriesContext);

  const isBookmarkModalActive = useBookmarkStore(
    (state) => state.isBookmarkModalActive
  );
  const closeBookmarkModal = useBookmarkStore(
    (state) => state.closeBookmarkModal
  );

  const openCategoryModal = useCategoryStore(
    (state) => state.openCategoryModal
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getFieldState,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!isValidUrl(data.url)) {
      setError("url", {
        type: "incorrectUrl",
        message: "Please, provide correct URL",
      });
      return;
    }
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
    <div className="flex flex-col gap-8 w-full ">
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
            error={getFieldState("url").error}
          />
          {errors.url && errors.url.type === "incorrectUrl" && (
            <InputErrorMessage message={errors.url.message as string} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <NewInput
            register={register}
            label="Name a bookmark"
            type="text"
            name="name"
            placeholder="Name"
            required
            error={getFieldState("name").error}
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
            error={getFieldState("description").error}
          />
        </div>
        <div className="flex flex-col gap-1">
          {categories.length === 0 ? (
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
                    <SelectTrigger className="w-full text-sm rounded-xl px-4 py-2 ring-0 ring-offset-0 dark:bg-neutral-800 dark:border-neutral-700 focus:ring-offset-0 focus:ring-0">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl dark:bg-neutral-900">
                      {categories?.map((item) => (
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
