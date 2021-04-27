import { IsString } from "class-validator";

export class CreateUserBody {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}
