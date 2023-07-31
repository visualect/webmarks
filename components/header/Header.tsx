"use client";

import Container from "../Container";
import Link from "next/link";
import { User } from "@prisma/client";
import ProfileMenu from "./ProfileMenu";
import { useState } from "react";

interface IHeaderProps {
  currentUser: User;
}

export default function Header({ currentUser }: IHeaderProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header
      className="border-b bg-white"
      onClick={() => setIsProfileMenuOpen(false)}
    >
      <Container>
        <div className="flex flex-row items-center justify-between gap-8 py-5">
          <span className="font-bold">
            <Link href={"/"}>Webmarks</Link>
          </span>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsProfileMenuOpen((value: boolean) => !value);
            }}
            className="relative underline underline-offset-4 cursor-pointer select-none"
          >
            {currentUser.name}
            <ProfileMenu isOpen={isProfileMenuOpen} />
          </div>
        </div>
      </Container>
    </header>
  );
}
