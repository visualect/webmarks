"use client";

import { redirect } from "next/navigation";

export default function Home() {
  const currentUser = false;
  !currentUser && redirect("/login");

  return <div>Home page</div>;
}
