import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { GradeResponse } from "./StudentGradeResponse";

export class StudentResponse {
  @IsNumber()
  public id: number;

  @IsNumber()
  public nim: string;

  @IsString()
  public name: string;

  @IsString()
  public imgPath: string;

  @IsNumber()
  public ipk: number;

  @ValidateNested()
  @Type(() => GradeResponse)
  public studentGrades: GradeResponse[];
}
