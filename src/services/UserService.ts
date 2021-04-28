import User from "@/entity/User";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import argon2 from "argon2";

@Service()
export class UserService {
  private userRepository: Repository<User> = getRepository(
    User,
    process.env.NODE_ENV === "test" ? "test" : "default"
  );

  public async getUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  public async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  public async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }

  public async createUser(user: User) {
    user.password = await argon2.hash(user.password);
    const createdUser = await this.userRepository.save(user);
    return createdUser;
  }

  public async updateUser(id: number, user: Partial<User>) {
    if (user.password) {
      user.password = await argon2.hash(user.password);
    }
    const updatedUser = await this.userRepository.update(id, user);
    return updatedUser;
  }

  public async deleteUser(id: number) {
    await this.userRepository.delete(id);
    return;
  }
}
