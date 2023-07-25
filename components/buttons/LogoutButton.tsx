"use client";

import Button from "./Button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button
      label="Logout"
      style="primary"
      action={() => signOut()}
      size="small"
    />
  );
}
