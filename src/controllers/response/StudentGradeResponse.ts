import { StudentGradeIndex } from '@prisma/client';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';

export class GradeResponse {
  @IsEnum(StudentGradeIndex)
  public grade: StudentGradeIndex;

  @IsArray()
  public lo: number[];

  @IsNumber()
  public quiz: number;

  @IsNumber()
  public midTest: number;

  @IsNumber()
  public finalTest: number;

  @IsNumber()
  public practicum: number;

  @IsNumber()
  public homework: number;
}

export class GradeBulkResponse {
  @IsString({ each: true })
  errors: string[];
}
