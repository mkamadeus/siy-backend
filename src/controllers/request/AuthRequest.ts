import { IsString } from "class-validator";

export class LoginBody {
  @IsString()
  public username : string

  @IsString()
  public password : string
}