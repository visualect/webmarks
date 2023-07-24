import { authOptions } from "@/configs/auth";
import { prisma } from "@/utils/prismadb";
import { getServerSession } from "next-auth";

export default async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email,
    },
  });

  if (!user) return null;

  return user;
}
