import { Category, User } from "@prisma/client";

export type UserWithCategory = User & { categories: Category[] };
