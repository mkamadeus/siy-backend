import Container, { Service } from "typedi";
import argon2 from "argon2";
import { UserService } from "./UserService";
import jwt from "jsonwebtoken";
import { env } from "@/env";

@Service()
export class AuthService {
  public async login(username: string, password: string) {
    const user = await Container.get(UserService).getUserByUsername(username);

    if (user || (await argon2.verify(user.password, password))) {
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
    await Container.get(UserService).updateUser(user.id, {
      refreshToken: null,
    });
  }
}
