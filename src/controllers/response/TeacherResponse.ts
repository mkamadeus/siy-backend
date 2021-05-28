import { IsNumber, IsString } from 'class-validator';

export class TeacherResponse {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;
}
