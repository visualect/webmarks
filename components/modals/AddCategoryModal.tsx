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

  const colorVariants = {
    indigo:
      "bg-indigo-500/5 text-indigo-500 border-indigo-300 shadow-indigo-300",
    rose: "bg-rose-500/5 text-rose-500 border-rose-300 shadow-rose-300",
    emerald:
      "bg-emerald-500/5 text-emerald-500 border-emerald-300 shadow-emerald-300",
    amber: "bg-amber-500/5 text-amber-500 border-amber-300 shadow-amber-300",
    fuchsia:
      "bg-fuchsia-500/5 text-fuchsia-500 border-fuchsia-300 shadow-fuchsia-300",
  };

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
    <div className="flex flex-col gap-8 w-[350px]">
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
          <div className="flex flex-row gap-2 justify-between">
            {colors.map((item) => (
              <Controller
                name="color"
                key={item.value}
                rules={{ required: true }}
                control={control}
                render={() => (
                  <div
                    className={`${
                      colorVariants[item.value as keyof typeof colorVariants]
                    } border rounded-xl p-2 text-sm font-bold cursor-pointer
                    ${item.value === getValues("color") && "shadow-lg"}`}
                    key={item.label}
                    onClick={() =>
                      setValue("color", item.value, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                  >
                    {item.label}
                  </div>
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
