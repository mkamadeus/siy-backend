import { IndexEnum } from "@/enum/IndexEnum";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGradeBody {
  @IsNumber()
  public studentId: number;

  @IsNumber()
  public lectureId: number;

  @IsEnum(IndexEnum)
  public index: string;

  @IsNumber()
  public semester: number;

  @IsNumber()
  public year: number;
}
export class CreateGradeByNimBody {
  @IsNumber()
  public lectureId: number;

  @IsEnum(IndexEnum)
  public index: string;

  @IsNumber()
  public semester: number;

  @IsNumber()
  public year: number;
}
export class UpdateGradeBody {
  @IsNumber()
  @IsOptional()
  public studentId: number;

  @IsNumber()
  @IsOptional()
  public lectureId: number;

  @IsEnum(IndexEnum)
  @IsOptional()
  public index: string;

  @IsNumber()
  @IsOptional()
  public semester: number;

  @IsNumber()
  @IsOptional()
  public year: number;
}
