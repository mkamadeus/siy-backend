import { IsNumber, IsOptional} from "class-validator";

export class CreateLectureBody {
  @IsNumber()
  public courseId: number;

  @IsNumber()
  public semester: number;

  @IsNumber()
  public year: number;
}

export class UpdateLectureBody {
  @IsNumber()
  @IsOptional()
  public courseId: number;

  @IsNumber()
  @IsOptional()
  public semester: number;

  @IsNumber()
  @IsOptional()
  public year: number;
}
