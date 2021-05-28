import { IsNumber } from 'class-validator';

export class TeachingHistoryResponse {
  @IsNumber()
  public id: number;

  @IsNumber()
  teacherId: number;

  @IsNumber()
  lectureId: number;

  @IsNumber()
  portofolio: number;
}
