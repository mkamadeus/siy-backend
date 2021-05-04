import { IsNumber } from 'class-validator';

export class TeachesResponse {
  @IsNumber()
  public id: number;

  @IsNumber()
  teacherId: number;

  @IsNumber()
  lectureId: number;

  @IsNumber()
  portofolio: number;
}
