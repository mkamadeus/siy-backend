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
}

