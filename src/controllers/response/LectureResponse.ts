import { IsNumber } from "class-validator";

export class LectureResponse {
  @IsNumber()
  public id: number;

  @IsNumber()
  public courseId: number;

  @IsNumber()
  public semester: number;

  @IsNumber()
  public year: number;

  // KMT Weight
  @IsNumber()
  public loAKMTWeight?: number;

  @IsNumber()
  public loBKMTWeight?: number;

  @IsNumber()
  public loCKMTWeight?: number;

  @IsNumber()
  public loDKMTWeight?: number;

  @IsNumber()
  public loEKMTWeight?: number;

  @IsNumber()
  public loFKMTWeight?: number;

  @IsNumber()
  public loGKMTWeight?: number;

  // Final Weight
  @IsNumber()
  public loAFinalWeight?: number;

  @IsNumber()
  public loBFinalWeight?: number;

  @IsNumber()
  public loCFinalWeight?: number;

  @IsNumber()
  public loDFinalWeight?: number;

  @IsNumber()
  public loEFinalWeight?: number;

  @IsNumber()
  public loFFinalWeight?: number;

  @IsNumber()
  public loGFinalWeight?: number;

  // Mid Weight
  @IsNumber()
  public loAMidWeight?: number;

  @IsNumber()
  public loBMidWeight?: number;

  @IsNumber()
  public loCMidWeight?: number;

  @IsNumber()
  public loDMidWeight?: number;

  @IsNumber()
  public loEMidWeight?: number;

  @IsNumber()
  public loFMidWeight?: number;

  @IsNumber()
  public loGMidWeight?: number;

  // Homework Weight
  @IsNumber()
  public loAHomeworkWeight?: number;

  @IsNumber()
  public loBHomeworkWeight?: number;

  @IsNumber()
  public loCHomeworkWeight?: number;

  @IsNumber()
  public loDHomeworkWeight?: number;

  @IsNumber()
  public loEHomeworkWeight?: number;

  @IsNumber()
  public loFHomeworkWeight?: number;

  @IsNumber()
  public loGHomeworkWeight?: number;

  // Quiz Weight
  @IsNumber()
  public loAQuizWeight?: number;

  @IsNumber()
  public loBQuizWeight?: number;

  @IsNumber()
  public loCQuizWeight?: number;

  @IsNumber()
  public loDQuizWeight?: number;

  @IsNumber()
  public loEQuizWeight?: number;

  @IsNumber()
  public loFQuizWeight?: number;

  @IsNumber()
  public loGQuizWeight?: number;

  // Practicum Weight
  @IsNumber()
  public loAPracticumWeight?: number;

  @IsNumber()
  public loBPracticumWeight?: number;

  @IsNumber()
  public loCPracticumWeight?: number;

  @IsNumber()
  public loDPracticumWeight?: number;

  @IsNumber()
  public loEPracticumWeight?: number;

  @IsNumber()
  public loFPracticumWeight?: number;

  @IsNumber()
  public loGPracticumWeight?: number;
}
