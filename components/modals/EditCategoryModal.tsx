"use client";

import { useContext, useEffect, useMemo } from "react";
import Modal from "./Modal";
import Button from "../buttons/Button";
import { useCategoryStore } from "@/store/store";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import NewInput from "../NewInput";
import { CategoriesContext } from "@/providers/CategoriesProvider";
import CategoryTag from "../categories/CategoryTag";


export default function EditCategoryModal() {
  const router = useRouter();
  const params = useSearchParams();
  const currentCategoryId = params.get("edit_category") as string;
  const categories = useContext(CategoriesContext);

  const category = useMemo(() => {
    return categories.find((item) => item.id === currentCategoryId);
  }, [categories, currentCategoryId]);

  const {
    register,
    handleSubmit,
    getFieldState,
    reset,
    control,
    setValue,
    getValues,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<FieldValues>();

  useEffect(() => {
    if (currentCategoryId && category) {
      setValue("name", category.name);
      setValue("color", category.color);
    }
    return () => {
      reset();
    };
  }, [category, currentCategoryId, reset, setValue]);

  const isOpen = useCategoryStore((state) => state.isEditModalActive);
  const closeEditModal = useCategoryStore((state) => state.closeEditModal);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.patch(`/api/categories/${currentCategoryId}`, data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      closeEditModal();
      router.push("/", { scroll: false });
      router.refresh();
      toast.success("Category was successfully updated!");
    }
  };

  const colors = [
    { value: "indigo", label: "Indigo" },
    { value: "emerald", label: "Emarald" },
    { value: "rose", label: "Rose" },
    { value: "amber", label: "Amber" },
    { value: "fuchsia", label: "Fuchsia" },
  ];

  const body = (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="font-bold text-center">Edit category</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <NewInput
            register={register}
            label="Name"
            name="name"
            placeholder="Name"
            type="text"
            required
            error={getFieldState("name").error}
          />
        </div>
        <div className="w-full">
          <p className="text-xs text-gray-500 mb-2">Color</p>
          <div className="flex flex-row flex-wrap gap-2 sm:justify-between">
            {colors.map((item) => (
              <Controller
                name="color"
                key={item.label}
                control={control}
                rules={{ required: true }}
                render={() => (
                  <CategoryTag
                    key={item.label}
                    label={item.label}
                    color={item.value}
                    selected={item.value === getValues('color')}
                    action={() => setValue('color', item.value, { shouldDirty: true, shouldValidate: true })}
                    id={currentCategoryId}
                  />
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-end gap-2">
          <Button
            label="Save changes"
            style="primary"
            size="normal"
            isSumbitting={isSubmitting}
            disabled={isSubmitting || !isDirty || !isValid}
          />
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
        router.push("/", { scroll: false });
      }}
    />
  );
}
