"use client";

import { signOut } from "next-auth/react";
import MenuItem from "./MenuItem";

interface IProfileMenu {
  isOpen: boolean;
}

export default function ProfileMenu({ isOpen }: IProfileMenu) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={` ${
        !isOpen ? "hidden" : null
      } absolute left-0 top-8 p-2 bg-white rounded-xl border`}
    >
      <ul className="flex flex-col gap-2 min-w-[150px]">
        <MenuItem label={"Manage categories"} action={() => {}} />
        <hr />
        <MenuItem label={"Log out"} action={() => signOut()} />
      </ul>
    </div>
  );
}
