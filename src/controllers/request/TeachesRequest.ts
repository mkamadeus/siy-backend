import { IsNumber, IsOptional } from "class-validator";

export class CreateTeachesBody{
    @IsNumber()
    public teacherId: number;

    @IsNumber()
    public lectureId: number;
}

export class UpdateTeachesBody{
    @IsNumber()
    @IsOptional()
    public teacherId: Number;

    @IsNumber()
    @IsOptional()
    public lectureId: number;
}