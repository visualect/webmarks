"use client";

import { AiFillGithub } from "react-icons/ai";
import Container from "../Container";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <Container>
        <div className="flex flex-row items-center justify-between gap-8 py-5">
          <div className="text-sm">
            Made by{" "}
            <a
              className="underline underline-offset-2"
              href="https://github.com/visualect"
              target="_blank"
            >
              Yan
            </a>
          </div>
          <div>
            <a href="https://github.com/visualect/webmarks" target="_blank">
              <AiFillGithub size={24} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
