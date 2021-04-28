import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTeacherBody {
  @IsString()
  public name: string;

  @IsNumber()
  public userId: number;
}

export class UpdateTeacherBody {
  @IsString()
  @IsOptional()
  public name: string;

  @IsNumber()
  @IsOptional()
  public userId: number;
}
