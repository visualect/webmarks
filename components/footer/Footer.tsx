"use client";

import Container from "../Container";
import Link from "next/link";
import { User } from "@prisma/client";
import ProfileMenu from "../menu/ProfileMenu";
import { useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <Container>
        <div className="py-6">Footer</div>
      </Container>
    </footer>
  );
}
