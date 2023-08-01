import getCurrentUser from "@/actions/getCurrentUser";
import { prisma } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { bookmarkId: string } }
) {
  const id = params.bookmarkId;
  const currentUser = await getCurrentUser();

  if (!currentUser) throw new Error("User not found");

  const isUserOwner = await prisma.bookmark.findUnique({
    where: {
      id,
      userId: currentUser.id,
    },
  });

  let deletedBookmark;
  if (isUserOwner) {
    deletedBookmark = await prisma.bookmark.delete({
      where: {
        id,
        userId: currentUser.id,
      },
    });
  } else {
    throw new Error("Authorization error");
  }

  return NextResponse.json(deletedBookmark);
}

export async function PATCH(
  req: Request,
  { params }: { params: { bookmarkId: string } }
) {
  const body = await req.json();
  const value = body.value;
  const id = params.bookmarkId;
  const currentUser = await getCurrentUser();

  if (!currentUser) throw new Error("User not found");

  const isUserOwner = await prisma.bookmark.findUnique({
    where: {
      userId: currentUser.id,
      id,
    },
  });

  let updatedBookmark;

  if (isUserOwner) {
    updatedBookmark = await prisma.bookmark.update({
      where: {
        userId: currentUser.id,
        id,
      },
      data: {
        favorite: value,
      },
    });
  }

  return NextResponse.json(updatedBookmark);
}
