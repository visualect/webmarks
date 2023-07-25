import { authOptions } from "@/configs/auth";
import { UserWithCategory } from "@/types/types";
import { prisma } from "@/utils/prismadb";
import { getServerSession } from "next-auth";

export default async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email,
    },
    include: {
      categories: true,
    },
  });

  if (!user) return null;

  return user as UserWithCategory;
}
