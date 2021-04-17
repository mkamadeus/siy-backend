import User from "@/entity/User";
import { UserService } from "@/services/UserService";
import { Body, Get, JsonController, Param, Post } from "routing-controllers";

@JsonController("/user")
export class UserController {
  constructor(private userService: UserService) {
    this.userService = userService;
  }

  @Get("/")
  public async getAllUsers() {
    return await this.userService.getUsers();
  }

  @Get("/:id")
  public async getUserById(@Param("id") id: number) {
    return await this.userService.getUserById(id);
  }

  @Post("/")
  public async createUser(@Body() user: User) {
    return await this.userService.createUser(user);
  }
}
