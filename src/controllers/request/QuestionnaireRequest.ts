import { IsNumber } from "class-validator";

export class CreateQuestionnaireBody {
    @IsNumber()
    public studentId: number;

    @IsNumber()
    public lectureId: number;

}