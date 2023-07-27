import getCurrentUser from "@/actions/getCurrentUser";
import { prisma } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, color } = await req.json();
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      categories: {
        create: { name, color },
      },
    },
    include: {
      categories: true,
    },
  });

  return NextResponse.json(updatedUser);
}
