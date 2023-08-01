"use client";

import Container from "../Container";
import Link from "next/link";
import { User } from "@prisma/client";
import ProfileMenu from "../menu/ProfileMenu";
import { useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

interface IHeaderProps {
  currentUser: User;
}

export default function Header({ currentUser }: IHeaderProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const dropdownRef = useClickOutside(() => {
    setIsProfileMenuOpen(false);
  });

  return (
    <header className="border-b bg-white">
      <Container>
        <div className="flex flex-row items-center justify-between gap-8 py-5">
          <span className="font-bold">
            <Link href={"/"}>Webmarks</Link>
          </span>
          <div
            ref={dropdownRef}
            onClick={(e) => {
              e.stopPropagation();
              setIsProfileMenuOpen((prev: boolean) => !prev);
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
