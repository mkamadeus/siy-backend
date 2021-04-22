import Container, { Service } from "typedi";
import argon2 from "argon2";
import { UserService } from "./UserService";
import jwt from "jsonwebtoken";
import { env } from "@/env";

@Service()
export class AuthService {
  public async login(username: string, password: string) {
    const user = await Container.get(UserService).getUserByUsername(username);

    if (!user) {
      throw new Error("Credentials invalid");
    }

    // console.log(user, password);

    if (await argon2.verify(user.password, password)) {
      const accessToken = jwt.sign({ id: user.id }, env.accessTokenSecret, {
        expiresIn: 60 * 60,
      });
      const refreshToken = jwt.sign({ id: user.id }, env.refreshTokenSecret, {
        expiresIn: 60 * 60 * 24 * 7,
      });

      await Container.get(UserService).updateUser(user.id, { refreshToken });
      return { accessToken, refreshToken };
    }

    throw new Error("Credentials invalid");
  }

  public async invalidateUser(username: string) {
    const user = await Container.get(UserService).getUserByUsername(username);
    if (!user.username) {
      throw new Error("No user with that username");
    }

    await Container.get(UserService).updateUser(user.id, {
      refreshToken: null,
    });
  }

  public async getUserByToken(accessToken: string) {
    const decoded: { id: number; iat: number; exp: number } = jwt.verify(
      accessToken,
      env.accessTokenSecret
    ) as { id: number; iat: number; exp: number };

    const user = await Container.get(UserService).getUserById(decoded.id);
    return user;
  }
}
