import Container, { Service } from "typedi";
import argon2 from "argon2";
import { UserService } from "./UserService";
import jwt from "jsonwebtoken";
import { env } from "@/env";
import { DecodedToken } from "@/enum/SessionEnum";

@Service()
export class AuthService {
  public async login(username: string, password: string) {
    const user = await Container.get(UserService).getUserByUsername(username);

    if (!user) {
      throw new Error("Credentials invalid");
    }

    if (await argon2.verify(user.password, password)) {
      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        env.accessTokenSecret,
        {
          expiresIn: 60 * 60,
        }
      );
      const refreshToken = jwt.sign(
        { id: user.id, role: user.role },
        env.refreshTokenSecret,
        {
          expiresIn: 60 * 60 * 24 * 7,
        }
      );

      await Container.get(UserService).updateUser(user.id, { refreshToken });
      return { accessToken, refreshToken };
    }

    throw new Error("Credentials invalid");
  }

  public async refreshToken(refreshToken: string) {
    const decoded: DecodedToken = jwt.verify(
      refreshToken,
      env.refreshTokenSecret
    ) as DecodedToken;

    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      env.accessTokenSecret,
      {
        expiresIn: 60 * 60,
      }
    );

    return { accessToken, refreshToken };
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
    const decoded: DecodedToken = jwt.verify(
      accessToken,
      env.accessTokenSecret
    ) as DecodedToken;

    const user = await Container.get(UserService).getUserById(decoded.id);
    return user;
  }

  public parseBearerToken(token: string) {
    const jwtToken = token.split(" ");
    if (jwtToken.length != 2) throw new Error("Invalid token");

    return jwtToken[1];
  }
}
