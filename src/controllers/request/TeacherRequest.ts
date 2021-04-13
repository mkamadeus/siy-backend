import { IsOptional, IsString } from "class-validator";


export class CreateTeacherBody {
    @IsString()
    public name: string;
}

export class UpdateTeacherBody {
    @IsString()
    @IsOptional()
    public name: string;
}