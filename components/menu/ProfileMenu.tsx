"use client";

import { signOut } from "next-auth/react";
import MenuItem from "./MenuItem";
import Menu from "./Menu";

interface IProfileMenu {
  isOpen: boolean;
}

export default function ProfileMenu({ isOpen }: IProfileMenu) {
  const body = (
    <ul className="flex flex-col gap-2 min-w-[150px]">
      <MenuItem label={"Manage categories"} action={() => {}} />
      <hr />
      <MenuItem label={"Log out"} action={() => signOut()} />
    </ul>
  );
  return <Menu body={body} isOpen={isOpen} />;
}
