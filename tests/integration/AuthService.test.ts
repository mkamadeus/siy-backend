import { Token } from '@/models/Auth';
import { User } from '@/models/User';
import { prisma } from '@/repository/prisma';
import { AuthService } from '@/services/AuthService';
import { UserService } from '@/services/UserService';
import { expect } from 'chai';
import Container from 'typedi';

describe('Auth service test', () => {
  const userService = Container.get(UserService);
  const authService = Container.get(AuthService);
  let user: User;
  let token: Token;

  before(async () => {
    await prisma.$connect();
  });

  before(async () => {
    // Setup user
    user = await userService.createUser({
      username: 'mkamadeus',
      password: 'pisang123',
    });
  });

  describe('Login tests', () => {
    it('should throw error when username invalid', async () => {
      try {
        await authService.login('mkamadeussss', 'pisang123');
        expect.fail('Should fail to login');
      } catch (err) {
        expect(err.message).to.be.eq('Credentials invalid');
      }
    });

    it('should throw error when password invalid', async () => {
      try {
        await authService.login('mkamadeussss', 'pisang123');
        expect.fail('Should fail to login');
      } catch (err) {
        expect(err.message).to.be.eq('Credentials invalid');
      }
    });

    it('should login correctly', async () => {
      token = await authService.login('mkamadeus', 'pisang123');
      expect(token.accessToken).to.not.be.undefined;
      expect(token.refreshToken).to.not.be.undefined;
    });

    it('should parse to user', async () => {
      const currentUser = await authService.getUserByToken(token.accessToken);
      expect(currentUser.id).to.eql(user.id);
    });
  });

  describe('Refresh token test', () => {
    it('should give a new token', (done) => {
      const prevAccessToken = token.accessToken;
      const prevRefreshToken = token.refreshToken;
      setTimeout(async () => {
        token = await authService.refreshToken(token.refreshToken);
        expect(prevAccessToken).to.not.be.eq(token.accessToken);
        expect(prevRefreshToken).to.be.eq(token.refreshToken);
        done();
      }, 1000);
    }).timeout(3000);
  });

  describe('Invalidating a user', () => {
    it('remove refresh token', async () => {
      await authService.invalidateUser(user.username);
    });
  });

  after(async () => {
    // Cleanup user
    await userService.deleteUser(user.id);
  });

  after(async () => {
    await prisma.$disconnect();
  });
});
