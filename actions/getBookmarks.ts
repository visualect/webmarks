import { prisma } from "@/utils/prismadb";
import { Bookmark } from "@prisma/client";

export async function getBookmarksById(userId: string) {
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: userId,
    },
  });

  return bookmarks as Bookmark[];
}
