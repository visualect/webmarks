"use client";

import { useState } from "react";
import Button from "@/components/buttons/Button";
import Input from "@/components/Input";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      redirect: false,
      email,
      password,
    }).then((result) => {
      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push("/");
      }
    });
  };

  const form = (
    <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-4">
      <Input
        value={email}
        onChange={onChangeEmail}
        placeholder={"Email"}
        type="text"
      />
      <Input
        value={password}
        onChange={onChangePassword}
        placeholder={"Password"}
        type="password"
      />
      <Button label="Sign in" style="primary" />
      {error ? error : null}
    </form>
  );

  return <AuthWrapper form={form} authType="login" />;
}
