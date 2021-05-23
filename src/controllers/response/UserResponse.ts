import { Exclude } from 'class-transformer';
import { /* IsEnum,*/ IsNumber, IsString } from 'class-validator';

export class UserResponse {
  @IsNumber()
  public id: number;

  @IsString()
  public username: string;

  @IsString()
  @Exclude()
  public password: string;

  @IsString()
  public refreshToken: string;

  // @IsEnum(UserRole)
  // public role: UserRole;
}
