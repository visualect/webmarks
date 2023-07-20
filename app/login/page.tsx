"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthWrapper from "@/components/auth/AuthWrapper";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const form = (
    <form className="flex flex-col gap-4">
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
      <Button label="Sign in" style="primary" action={() => {}} />
    </form>
  );

  return <AuthWrapper form={form} authType="login" />;
}
