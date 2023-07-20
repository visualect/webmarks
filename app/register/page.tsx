"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthWrapper from "@/components/auth/AuthWrapper";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const form = (
    <form className="flex flex-col gap-4">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={"Name"}
        type="text"
      />
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={"Email"}
        type="text"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={"Password"}
        type="password"
      />
      <Button label="Sign up" style="primary" action={() => {}} />
    </form>
  );

  return <AuthWrapper form={form} authType="register" />;
}
