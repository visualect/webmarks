import { AiFillGithub } from "react-icons/ai";
import Container from "../Container";
import { BsArrowUpRight } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-transparent">
      <Container>
        <div className="flex flex-row items-center justify-between gap-8 py-10">
          <div>
            <a href="https://github.com/visualect/webmarks" target="_blank">
              <AiFillGithub
                size={24}
                className="hover:text-gray-500 transition duration-100 ease-out"
              />
            </a>
          </div>
          <div className="flex flex-row gap-1 text-sm">
            <span>
              Made by
            </span>
            <a
              className="underline underline-offset-2"
              href="https://github.com/visualect"
              target="_blank"
            >
              Yan
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
