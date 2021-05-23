import { IsNumber, IsOptional } from 'class-validator';

export class LectureHistoryRequest {
  @IsNumber()
  public studentId: number;

  @IsNumber()
  public lectureId: number;

  @IsNumber()
  @IsOptional()
  public gradeId: number;

  @IsNumber()
  @IsOptional()
  public attendance: number;
}
