import { AiFillGithub } from "react-icons/ai";
import Container from "../Container";
import { BsArrowUpRight } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className=" bg-transparent">
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
          <div className="flex flex-row gap-1 text-sm group relative">
            Made by{" "}
            <a
              className="underline underline-offset-2"
              href="https://github.com/visualect"
              target="_blank"
            >
              <BsArrowUpRight
                size={8}
                className="absolute top-2 right-0 text-gray-800 opacity-0 pointer-events-none group-hover:opacity-100 transition duration-100 group-hover:translate-x-3 group-hover:-translate-y-3 east"
              />
              Yan
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
