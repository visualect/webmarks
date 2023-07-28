import { prisma } from "@/utils/prismadb";
import { Bookmark } from "@prisma/client";

export async function getBookmarksById(userId: string) {
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: userId,
    },
  });

  // if (!bookmarks) return null;

  return bookmarks as Bookmark[];
}
