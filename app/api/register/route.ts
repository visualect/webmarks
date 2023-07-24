import { prisma } from "@/utils/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  const isUserAlreadyExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUserAlreadyExist) throw new Error("User already exist");

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
