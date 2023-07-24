import { prisma } from "@/utils/prismadb";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { User } from "@prisma/client";
import type { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) {
          throw new Error("Missing fields");
        }
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user || !user?.hashedPassword)
          throw new Error("User does not exist");

        const { hashedPassword } = user;

        const isCorrectPassword = await bcrypt.compare(
          password,
          hashedPassword
        );

        if (!isCorrectPassword) throw new Error("Invalid password");

        return user as User;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};
