import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCourseBody {
  @IsString()
  public code: string;

  @IsNumber()
  public credits: number;

  @IsString()
  public name: string;

  @IsString()
  public briefSyllabus: string;

  @IsString()
  public completeSyllabus: string;

  @IsString()
  public outcome: string;
}

export class UpdateCourseBody {
  @IsString()
  @IsOptional()
  public code: string;

  @IsNumber()
  @IsOptional()
  public credits: number;

  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public briefSyllabus: string;

  @IsString()
  @IsOptional()
  public completeSyllabus: string;

  @IsString()
  @IsOptional()
  public outcome: string;
}
