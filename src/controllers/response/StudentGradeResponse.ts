import { IndexEnum } from "@/enum/IndexEnum";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class GradeResponse {
  @IsNumber()
  public id: number;

  @IsNumber()
  public studentId: number;

  @IsNumber()
  public lectureId: number;

  @IsNumber()
  public semester: number;

  @IsNumber()
  public year: number;

  @IsEnum(IndexEnum)
  public index: string;

  @IsNumber()
  public midTest: number;

  @IsNumber()
  public quiz: number;

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
