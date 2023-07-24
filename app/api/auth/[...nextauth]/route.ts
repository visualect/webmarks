import NextAuth from "next-auth/next";
import { authOptions } from "@/configs/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
