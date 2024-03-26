"use client";

import Button from "@/components/buttons/Button";
import AuthWrapper from "@/components/auth/AuthWrapper";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import NewInput from "@/components/NewInput";
import InputErrorMessage from "@/components/InputErrorMessage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    getFieldState,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    try {
      await axios.post("api/register", data);
      router.push("/login", { scroll: fals, });
    } catch (err: any) {
      setError("email", { type: "server", message: err.message });
    }
  };

  const form = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 "
    >
      <div className="flex flex-col gap-1">
        <NewInput
          placeholder="Name"
          register={register}
          required
          type="text"
          label="What's your name?"
          name="name"
          error={getFieldState("name").error}
        />
        {errors.name?.type === "required" && (
          <InputErrorMessage message="Name is required" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <NewInput
          placeholder="Email"
          register={register}
          required
          type="text"
          label="What's your email?"
          name="email"
          error={getFieldState("email").error}
        />
        {errors.email?.type === "required" && (
          <InputErrorMessage message="Email is required" />
        )}
        {errors.email?.type === "server" && (
          <InputErrorMessage
            message={"User with this email is already exist"}
          />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <NewInput
          placeholder="Password"
          register={register}
          required
          type="password"
          label="Create a password"
          name="password"
          error={getFieldState("password").error}
        />
        {errors.password?.type === "required" && (
          <InputErrorMessage message="Password is required" />
        )}
      </div>
      <Button
        label="Sign up"
        style="primary"
        size="normal"
        isSumbitting={isSubmitting}
        disabled={isSubmitting || !isDirty || !isValid}
      />
    </form>
  );

  return <AuthWrapper form={form} authType="register" />;
}
