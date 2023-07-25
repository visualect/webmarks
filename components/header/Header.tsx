import Container from "../Container";
import Link from "next/link";
import LogoutButton from "../buttons/LogoutButton";
import { User } from "@prisma/client";

interface IHeaderProps {
  currentUser: User;
}

export default async function Header({ currentUser }: IHeaderProps) {
  return (
    <header className="border-b bg-white">
      <Container>
        <div className="flex flex-row items-center justify-between gap-8 py-5">
          <span className="font-bold">
            <Link href={"/"}>Webmarks</Link>
          </span>
          <div className="flex flex-row items-center gap-4">
            <div>{currentUser.name}</div>
            <div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
