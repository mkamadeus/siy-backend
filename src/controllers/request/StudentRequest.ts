import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStudentBody {
  @IsString()
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
  @IsString()
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
