import { AuthService } from "@/services/AuthService";
import { Body, JsonController, Param, Post, Put } from "routing-controllers";
import { LoginBody } from "./request/AuthRequest";

@JsonController("/auth")
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  @Post("/login")
  public async login(@Body() credentials: LoginBody) {
    return await this.authService.login(
      credentials.username,
      credentials.password
    );
  }

  @Put("/invalidate/:username")
  public async invalidateUser(@Param("username") username: string) {
    return await this.authService.invalidateUser(username);
  }
}
