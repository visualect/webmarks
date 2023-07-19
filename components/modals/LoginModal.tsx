"use client";

import { useState } from "react";
import Input from "../Input";
import Modal from "./Modal";
import Button from "../Button";
import Link from "next/link";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const body = (
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
  const footer = (
    <div className="text-center text-sm text-slate-800">
      Don&apos;t have an account?{" "}
      <Link
        className="text-gray-400 underline underline-offset-4 decoration-gray-400"
        href={"/register"}
      >
        Create
      </Link>
    </div>
  );

  return (
    <Modal
      body={body}
      title={"Sign in"}
      actionLabel="Sign in"
      action={() => {}}
      footer={footer}
    />
  );
}
