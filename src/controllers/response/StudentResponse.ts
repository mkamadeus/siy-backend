// import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
// import { GradeResponse } from './StudentGradeResponse';

export class StudentResponse {
  @IsNumber()
  public id: number;

  @IsString()
  public nim: string;

  @IsString()
  public name: string;

  @IsString()
  public imgPath: string;

  @IsNumber()
  public ipk: number;
}
