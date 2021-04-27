import { IsNumber, IsString } from "class-validator";

export class CourseAssessmentResponse {
  @IsNumber()
  public id: number;

  @IsString()
  public code: string;

  @IsString()
  public name: string;

  @IsNumber()
  public courseOutcome: number;

  @IsNumber()
  public questionnaires: number;

  @IsNumber()
  public portofolio: number;

  @IsNumber()
  public courseAssessment: number;

  @IsString()
  public mark: string;
}

export class CourseAssessment {
  public id: number;
  public code: string;
  public name: string;
  public courseOutcome: number;
  public questionnaires: number;
  public portofolio: number;
  public courseAssessment: number;
  public mark: string;
}
