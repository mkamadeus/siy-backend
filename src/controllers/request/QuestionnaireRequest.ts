import { IsNumber /*, IsOptional*/ } from 'class-validator';

export class CreateQuestionnaireBody {
  //@IsNumber()
  //public studentId: number;

  //@IsNumber()
  //public lectureId: number;

  @IsNumber({}, { each: true })
  public ratings_m: number[];
}

export class UpdateQuestionnaireBody {
  //@IsNumber()
  //@IsOptional()
  //public studentId: number;

  //@IsNumber()
  //@IsOptional()
  //public lectureId: number;

  @IsNumber({}, { each: true })
  public ratings_m: number[];
}
