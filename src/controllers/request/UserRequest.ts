import { IsOptional, IsString } from 'class-validator';

export class CreateUserBody {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsString()
  @IsOptional()
  public role: string;
}
