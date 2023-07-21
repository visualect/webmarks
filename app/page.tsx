"use client";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default function Home() {
  const currentUser = false;
  !currentUser && redirect("/login");

  return <div>Home page</div>;
}
