"use client";

import { useState } from "react";
import Button from "@/components/buttons/Button";
import NewInput from "@/components/NewInput";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import InputErrorMessage from "@/components/InputErrorMessage";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isDirty, isValid },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "example@mail.com",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signIn("credentials", {
      redirect: false,
      ...data,
    }).then((result) => {
      if (result?.error) {
        toast.error(result.error);
      } else if (result?.ok) {
        router.push("/");
      }
    });
  };

  const form = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 min-w-[300px]"
    >
      <div className="flex flex-col gap-1">
        <NewInput
          placeholder={"Email"}
          type="text"
          register={register}
          label="Email"
          name="email"
          required
        />
        {errors.email?.type === "required" && (
          <InputErrorMessage message="Email is required" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <NewInput
          placeholder={"Password"}
          type="password"
          register={register}
          label="Password"
          name="password"
          required
        />
        {errors.password?.type === "required" && (
          <InputErrorMessage message="Password is required" />
        )}
      </div>
      <div className="w-full">
        <Button
          label={false ? "Loading..." : "Sign in"}
          style="primary"
          size="normal"
          disabled={false}
        />
      </div>
    </form>
  );

  return <AuthWrapper form={form} authType="login" />;
}
