"use client";

import React from "react";
import Container from "../Container";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const currentPath = usePathname();
  if (currentPath === "/login" || currentPath === "/register") return null;

  return (
    <header className="border-b">
      <Container>
        <div className="flex flex-row items-center gap-8 py-5">
          <span className="font-bold">
            <Link href={"/"}>webmarks</Link>
          </span>
        </div>
      </Container>
    </header>
  );
}
