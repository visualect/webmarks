import getCurrentUser from "@/actions/getCurrentUser";
import { prisma } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const categoryId = params.categoryId;
  const currentUser = await getCurrentUser();

  if (!currentUser) throw new Error("Authorization error");

  const isUserOwner = await prisma.category.findUnique({
    where: {
      userId: currentUser.id,
      id: categoryId,
    },
  });

  let deletedCategory;

  if (isUserOwner) {
    deletedCategory = await prisma.category.delete({
      where: {
        userId: currentUser.id,
        id: categoryId,
      },
    });

    await prisma.bookmark.deleteMany({
      where: {
        userId: currentUser.id,
        category: deletedCategory.name,
      },
    });
  }

  return NextResponse.json(deletedCategory);
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const body = await req.json();
  const data = body;
  const categoryId = params.categoryId;
  const currentUser = await getCurrentUser();

  if (!currentUser) throw new Error("Authorization error");

  const isUserOwner = await prisma.category.findUnique({
    where: {
      userId: currentUser.id,
      id: categoryId,
    },
  });

  let updatedCategory;

  if (isUserOwner) {
    updatedCategory = await prisma.category.update({
      where: {
        userId: currentUser.id,
        id: categoryId,
      },
      data,
    });

    await prisma.bookmark.updateMany({
      where: {
        userId: currentUser.id,
        category: isUserOwner.name,
      },
      data: {
        category: updatedCategory.name,
      },
    });
  } else {
    throw new Error("Athorization error");
  }

  return NextResponse.json(updatedCategory);
}
