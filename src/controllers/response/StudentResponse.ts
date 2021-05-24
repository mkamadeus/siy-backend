import { IsNumber, IsString } from 'class-validator';

export class StudentResponse {
  @IsNumber()
  public id: number;

  @IsString()
  public nim: string;

  @IsString()
  public name: string;

  @IsString()
  public imgPath: string;

  @IsNumber()
  public ipk: number;
}
