import { IsNumber } from 'class-validator';

export class QuestionnaireResponse {
  @IsNumber()
  public id: number;

  @IsNumber()
  public studentId: number;

  @IsNumber()
  public lectureId: number;

  @IsNumber()
  public ratingM_1: number;

  @IsNumber()
  public ratingM_3: number;

  @IsNumber()
  public ratingM_4: number;

  @IsNumber()
  public ratingM_5: number;

  @IsNumber()
  public ratingM_7: number;

  @IsNumber()
  public ratingM_8: number;

  @IsNumber()
  public ratingM_10: number;

  @IsNumber()
  public ratingM_11: number;

  @IsNumber()
  public ratingM_12: number;

  // Teacher Average scores
  @IsNumber()
  public ratingM_2: number;

  @IsNumber()
  public ratingM_6: number;

  @IsNumber()
  public ratingM_9: number;
}
