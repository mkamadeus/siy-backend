import { IsNumber } from 'class-validator';

export class LectureHistoryResponse {
  @IsNumber()
  public studentId: number;

  @IsNumber()
  public lectureId: number;

  @IsNumber()
  public gradeId: number;

  @IsNumber()
  public attendance: number;
}
