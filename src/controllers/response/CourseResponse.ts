import { IsNumber, IsString } from 'class-validator';

export class CourseResponse {
  @IsNumber()
  public id: number;

  @IsString()
  public code: string;

  @IsNumber()
  public credits: number;

  @IsString()
  public name: string;

  @IsString()
  public silabusRingkas: string;

  @IsString()
  public silabusLengkap: string;

  @IsString()
  public outcome: string;
}
