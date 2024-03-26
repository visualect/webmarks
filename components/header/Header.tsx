'use client'

import { useTheme } from "next-themes";
import Container from "../Container";
import UserLabel from "./UserLabel";


export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-transparent">
      <Container>
        <div className="flex flex-row items-center justify-between  py-5">
          <div className="font-bold">webmarks</div>
          <div className="gap-8">
            <div>
              current theme is : {theme}
              <button onClick={() => setTheme('dark')}>dark</button>
              <button onClick={() => setTheme('light')}>light</button>
            </div>
            <UserLabel />
          </div>
        </div>
      </Container>
    </header>
  );
}

