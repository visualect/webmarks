"use client"

import { useContext, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import ProfileMenu from "../menu/ProfileMenu";
import { CurrentUserContext } from "@/providers/CurrentUserProvider";
import { User } from "@prisma/client";


export default function UserLabel() {
  const currentUser = useContext(CurrentUserContext) as User
  const dropdownRef = useClickOutside(() => {
    setIsProfileMenuOpen(false);
  });

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
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
  )
}

