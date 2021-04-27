import { AuthService } from "@/services/AuthService";
import { Body, JsonController, Param, Post, Put } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { LoginBody } from "./request/AuthRequest";
import { LoginResponse } from "./response/AuthResponse";

@JsonController("/auth")
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  @Post("/login")
  @ResponseSchema(LoginResponse)
  @OpenAPI({
    description: "Create new grade",
    responses: {
      "200": {
        description: "OK",
      },
      "400": {
        description: "Invalid credentials",
      },
    },
  })
  public async login(@Body() credentials: LoginBody) {
    return await this.authService.login(
      credentials.username,
      credentials.password
    );
  }

  @Put("/invalidate/:username")
  @ResponseSchema(null)
  @OpenAPI({
    description: "Create new grade",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async invalidateUser(@Param("username") username: string) {
    return await this.authService.invalidateUser(username);
  }
}
