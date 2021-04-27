import { IsString } from "class-validator";

export class LoginResponse {
  @IsString()
  public accessToken: string;

  @IsString()
  public refreshToken: string;
}
