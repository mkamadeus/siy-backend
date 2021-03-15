import { IndexEnum } from "@/enum/IndexEnum";
import { IsArray, IsEnum, IsNumber, IsString } from "class-validator";

export class GradeResponse {
  @IsNumber()
  public id: number;

  @IsNumber()
  public studentId: number;

  @IsEnum(IndexEnum)
  public index: string;

  @IsNumber()
  public lectureId: number;

  @IsNumber()
  public semester: number;

  @IsNumber()
  public year: number;
}

export class GradeBulkResponse {
  @IsString({ each: true })
  errors: string[];
}
