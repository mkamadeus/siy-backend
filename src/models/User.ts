import Prisma, { UserRole } from '@prisma/client';

export type User = Prisma.User;

export type UserCreateInput = Prisma.Prisma.UserCreateInput;

export type UserUpdateInput = Prisma.Prisma.UserUpdateInput;

export { UserRole };
