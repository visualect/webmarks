"use client";

import Button from "@/components/buttons/Button";
import NewInput from "@/components/NewInput";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import InputErrorMessage from "@/components/InputErrorMessage";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "example@mail.com",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await signIn("credentials", {
      redirect: false,
      ...data,
    }).then((result) => {
      if (result?.error) {
        result.error.includes("password")
          ? setError("password", {
              type: "server",
              message: result.error,
            })
          : setError("email", {
              type: "server",
              message: result.error,
            });
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
          error={!!errors.email?.message}
        />
        {errors.email?.type === "required" && (
          <InputErrorMessage message="Email is required" />
        )}
        {errors.email?.type === "server" && (
          <InputErrorMessage
            message={errors.email?.message?.toString() ?? "User does not exist"}
          />
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
          error={!!errors.password?.message}
        />
        {errors.password?.type === "required" && (
          <InputErrorMessage message="Password is required" />
        )}
        {errors.password?.type === "server" && (
          <InputErrorMessage
            message={
              errors.password?.message?.toString() ?? "Incorrect password"
            }
          />
        )}
      </div>
      <div className="w-full">
        <Button
          label={"Sign in"}
          style="primary"
          size="normal"
          disabled={isSubmitting || !isDirty || !isValid}
          isSumbitting={isSubmitting}
        />
      </div>
    </form>
  );

  return <AuthWrapper form={form} authType="login" />;
}
