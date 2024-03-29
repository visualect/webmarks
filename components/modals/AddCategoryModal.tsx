"use client";

import Modal from "./Modal";
import Button from "../buttons/Button";
import { useCategoryStore } from "@/store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import { toast } from "sonner";
import NewInput from "../NewInput";
import CategoryTag from "../categories/CategoryTag";

export default function AddCategoryModal() {
  const router = useRouter();

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


  const colors = [
    { value: "indigo", label: "Indigo" },
    { value: "emerald", label: "Emarald" },
    { value: "rose", label: "Rose" },
    { value: "amber", label: "Amber" },
    { value: "fuchsia", label: "Fuchsia" },
  ];

  const isOpen = useCategoryStore((state) => state.isCategoryModalActive);
  const closeCategoryModal = useCategoryStore(
    (state) => state.closeCategoryModal
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.post("/api/categories", data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      reset();
      closeCategoryModal();
      router.refresh();
    }
  };

  const body = (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="font-bold text-center">Create new category</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <NewInput
            register={register}
            label={"Name a new category"}
            name="name"
            required
            placeholder="Name"
            type="text"
            error={getFieldState("name").error}
          />
        </div>
        <div className="w-full">
          <p className="text-xs text-gray-500 mb-2">Choose a color</p>
          <div className="flex flex-row flex-wrap gap-2 sm:justify-between">
            {colors.map((item) => (
              <Controller
                name="color"
                key={item.value}
                rules={{ required: true }}
                control={control}
                render={() => (
                  <CategoryTag
                    key={item.label}
                    label={item.label}
                    color={item.value}
                    selected={item.value === getValues('color')}
                    action={() => setValue('color', item.value, { shouldDirty: true, shouldValidate: true })}
                  />
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-end gap-2">
          <Button
            label="Save"
            style="primary"
            size="normal"
            isSumbitting={isSubmitting}
            disabled={isSubmitting || !isValid || !isDirty}
          />
        </div>
      </form>
    </div>
  );

  return <Modal body={body} isOpen={isOpen} onClose={closeCategoryModal} />;
}
