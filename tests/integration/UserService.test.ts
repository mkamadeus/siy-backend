import { UserService } from '@/services/UserService';
import { expect } from 'chai';
import { Container } from 'typedi';
import { prisma } from '@/repository/prisma';
import argon2 from 'argon2';

describe('User service test', () => {
  let userId: number;
  const userService = Container.get(UserService);

  before(() => {
    prisma.$connect();
  });

  describe('User creation', () => {
    it('should have 0 user', async () => {
      const users = await userService.getAllUsers();
      expect(users.length).to.be.equal(0);
    });

    it('should have created 1 user', async () => {
      const user = await userService.createUser({
        username: 'mkamadeus',
        password: 'pisang123',
      });
      expect(user.username).to.be.equal('mkamadeus');
      expect(user.password).to.not.be.equal('pisang123');
      userId = user.id;
    });
  });

  describe('Password related testing', () => {
    it('should verify password correctly', async () => {
      const user = await userService.getUserById(userId);
      const result = await argon2.verify(user.password, 'pisang123');
      expect(result).to.be.true;
    });

    it('should update password, simulating forgot password', async () => {
      const user = await userService.updateUser(userId, {
        password: 'banana1234',
      });
      const oldResult = await argon2.verify(user.password, 'pisang123');
      expect(oldResult).to.be.false;
      const newResult = await argon2.verify(user.password, 'banana1234');
      expect(newResult).to.be.true;
    });
  });

  describe('Delete user', () => {
    it('should delete user', async () => {
      await userService.deleteUser(userId);
      const users = await userService.getAllUsers();
      expect(users.length).to.be.eq(0);
    });
  });

  after(() => {
    prisma.$disconnect();
  });
});
