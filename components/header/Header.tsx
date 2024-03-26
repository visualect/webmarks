'use client'

import Container from "../Container";
import UserLabel from "./UserLabel";
import ThemeSwitcher from "./ThemeSwitcher";


export default function Header() {

  return (
    <header className="bg-transparent">
      <Container>
        <div className="flex flex-row items-center justify-between  py-5">
          <div className="font-bold">webmarks</div>
          <div className="flex flex-row gap-8 items-center">
            <UserLabel />
            <ThemeSwitcher />
          </div>
        </div>
      </Container>
    </header>
  );
}

