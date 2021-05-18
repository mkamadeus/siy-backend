import { StudentGradeIndex } from '.prisma/client';
import { IndexEnum } from '@/enum/IndexEnum';
import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateGradeBody {
  @IsEnum(StudentGradeIndex)
  public grade: StudentGradeIndex;

  @IsArray()
  @IsOptional()
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

export class UpdateGradeBody {
  @IsEnum(StudentGradeIndex)
  @IsOptional()
  public grade: StudentGradeIndex;

  @IsArray()
  @IsOptional()
  public lo: number[];

  @IsNumber()
  @IsOptional()
  public quiz: number;

  @IsNumber()
  @IsOptional()
  public midTest: number;

  @IsNumber()
  @IsOptional()
  public finalTest: number;

  @IsNumber()
  @IsOptional()
  public practicum: number;

  @IsNumber()
  @IsOptional()
  public homework: number;
}

// export class CreateGradeByNimBody {
//   @IsNumber()
//   public lectureId: number;

//   @IsOptional()
//   @IsEnum(IndexEnum)
//   public index: string;

//   @IsNumber()
//   public semester: number;

//   @IsNumber()
//   public year: number;
// }
