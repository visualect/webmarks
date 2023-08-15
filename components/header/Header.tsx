"use client";

import Container from "../Container";
import { User } from "@prisma/client";
import ProfileMenu from "../menu/ProfileMenu";
import { useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import Logo from "../Logo";

interface IHeaderProps {
  currentUser: User;
}

export default function Header({ currentUser }: IHeaderProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const dropdownRef = useClickOutside(() => {
    setIsProfileMenuOpen(false);
  });

  return (
    <header className="bg-transparent">
      <Container>
        <div className="flex flex-row items-center justify-between gap-8 py-5">
          <div className="font-bold">Webmarks</div>
          <div
            ref={dropdownRef}
            onClick={(e) => {
              e.stopPropagation();
              setIsProfileMenuOpen((prev: boolean) => !prev);
            }}
            className="relative underline underline-offset-4 cursor-pointer select-none"
          >
            {currentUser.name}
            <ProfileMenu
              isOpen={isProfileMenuOpen}
              userEmail={currentUser.email as string}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
