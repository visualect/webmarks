import getCurrentUser from "@/actions/getCurrentUser";
import { prisma } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { url, name, description, category } = await req.json();
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const newBookmark = await prisma.bookmark.create({
    data: {
      userId: currentUser.id,
      url,
      name,
      description,
      category,
      favorite: false,
    },
    include: {
      user: true,
    },
  });

  return NextResponse.json(newBookmark);
}
