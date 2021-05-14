import { IsNumber, IsString } from "class-validator";

export class LOAssessmentResponse {
  @IsNumber()
  public id: number;

  @IsString()
  public loType: string;

  @IsNumber()
  public value: number;

  @IsString()
  public mark: string;
}

export class LOAssessment {
  public id: number;
  public loType: string;
  public value: number;
  public mark: string;
}
