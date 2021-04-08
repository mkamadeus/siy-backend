import User from "@/entity/User";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";

@Service()
export class UserService {
  private userRepository: Repository<User> = getRepository(
    User,
    process.env.NODE_ENV === "test" ? "test" : "default"
  );

  public getUsers() {
    
  }
}
