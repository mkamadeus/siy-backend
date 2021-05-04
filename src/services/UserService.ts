import { Service } from 'typedi';
import argon2 from 'argon2';
import { prisma } from '@/repository/prisma';
import { Prisma, User } from '@prisma/client';

@Service()
export class UserService {
  public async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  public async getUserById(id: number): Promise<User> {
    const user = await prisma.user.findFirst({ where: { id } });
    return user;
  }

  public async getUserByUsername(username: string): Promise<User> {
    const user = await prisma.user.findFirst({ where: { username } });
    return user;
  }

  public async createUser(data: Prisma.UserCreateInput): Promise<User> {
    data.password = await argon2.hash(data.password);
    const user = await prisma.user.create({ data });
    return user;
  }

  public async updateUser(
    id: number,
    data: Prisma.UserUpdateInput
  ): Promise<User> {
    if (data.password) {
      data.password = await argon2.hash(data.password as string);
    }
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  }

  public async deleteUser(id: number): Promise<User> {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  }
}
