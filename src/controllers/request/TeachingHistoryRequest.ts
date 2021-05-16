import { IsNumber, IsOptional } from 'class-validator';

export class CreateTeachingHistoryBody {
  @IsNumber()
  public teacherId: number;

  @IsNumber()
  public lectureId: number;
}

export class UpdateTeachingHistoryBody {
  @IsNumber()
  @IsOptional()
  public teacherId: number;

  @IsNumber()
  @IsOptional()
  public lectureId: number;

  @IsNumber()
  @IsOptional()
  public portofolio: number;
}

export class UpdatePortoBody {
  @IsNumber()
  public porto: number;
}
