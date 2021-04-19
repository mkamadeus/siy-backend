import { IsNumber, IsString } from "class-validator";

export class CreateUserBody {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsNumber()
  public role: number;
}
