"use client";

import { signOut } from "next-auth/react";
import MenuItem from "./MenuItem";
import Menu from "./Menu";
import { FiExternalLink } from "react-icons/fi";

interface IProfileMenu {
  isOpen: boolean;
  userEmail: string;
}

export default function ProfileMenu({ isOpen, userEmail }: IProfileMenu) {
  const body = (
    <ul className="flex flex-col gap-2 min-w-[150px]">
      <MenuItem label={`${userEmail}`} />
      <hr />
      <MenuItem
        icon={FiExternalLink}
        label={"Log out"}
        action={() => signOut()}
      />
    </ul>
  );
  return <Menu body={body} isOpen={isOpen} />;
}
