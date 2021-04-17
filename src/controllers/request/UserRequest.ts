import { IsNumber } from "class-validator";

export class CreateUserBody {
  @IsNumber()
  public id: number;

  @IsNumber()
  public lectureId: number;
}
