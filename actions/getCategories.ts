import { prisma } from "@/utils/prismadb";
import { Category } from "@prisma/client";

export async function getCategoriesById(userId: string) {
  const categories = await prisma.category.findMany({
    where: {
      userId: userId,
    },
  });

  return categories as Category[];
}
