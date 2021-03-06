import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateStudentBody {
  @IsNumber()
  public nim: string;

  @IsString()
  public name: string;

  @IsString()
  @IsOptional()
  public imgPath: string;

  @IsNumber()
  @IsOptional()
  public ipk: number;
}

export class UpdateStudentBody {
  @IsOptional()
  @IsNumber()
  public nim: string;

  @IsOptional()
  @IsString()
  public name: string;

  @IsString()
  @IsOptional()
  public imgPath: string;

  @IsNumber()
  @IsOptional()
  public ipk: number;
}
