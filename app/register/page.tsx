"use client";

import { useState } from "react";
import Button from "@/components/buttons/Button";
import Input from "@/components/Input";
import AuthWrapper from "@/components/auth/AuthWrapper";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("api/register", { name, email, password })
      .then(() => alert("User has been registred"))
      .catch((err) => alert(err.message));
  };

  const form = (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
      <Button label="Sign up" style="primary" size="normal" />
    </form>
  );

  return <AuthWrapper form={form} authType="register" />;
}
