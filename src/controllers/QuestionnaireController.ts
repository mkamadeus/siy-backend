import "reflect-metadata";
import {
    Body,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Put
} from "routing-controllers";
import { RatingQuestionnaireService } from "@/services/RatingQuestionnaireService";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { QuestionnaireResponse } from "./response/QuestionnaireResponse";
import { CreateQuestionnaireBody, UpdateQuestionnaireBody } from "./request/QuestionnaireRequest";
import RatingQuestionnaire from "@/entity/RatingQuestionnaire";


@JsonController("/questionnaire")
export class QuestionnaireController{
    constructor(private questionnaireService: RatingQuestionnaireService){
        this.questionnaireService = questionnaireService;
    }

    @Get("/")
    @ResponseSchema(QuestionnaireResponse, {isArray: true} )
    @OpenAPI({
        description: "Get all questionnaires",
        responses: {
            "200": {
                description: "OK",
            },
        },
    })
    public getAllQuestionnaires(){
        return this.questionnaireService.getAll();
    }

    @Get("/:id")
    @ResponseSchema(QuestionnaireResponse)
    @OpenAPI({
        description: "Get one questionnaires by ID",
        responses: {
            "200": {
                description: "OK",
            },
        },
    })
    public getOneQuestionnaire(@Param("id") id: number){
        return this.questionnaireService.getOne(id);
    }

    @Get("/lectures/:id")
    @ResponseSchema(QuestionnaireResponse)
    @OpenAPI({
        description: "Get questionnaires by Lecture",
        responses: {
            "200": {
                description: "OK",
            },
        },
    })
    public getQuestionnairesByLecture(@Param("id") id: number){
        return this.questionnaireService.getByLectureId(id);
    }

    @Post("/")
    @ResponseSchema(QuestionnaireResponse)
    @OpenAPI({
        description: "Create new questionnaire response",
        responses: {
            "200": {
                description: "OK",
            },
            "400": {
                description: "Bad request",
            },
        },
    })
    public createQuestionnaire(@Body() rq: CreateQuestionnaireBody) {
        return this.questionnaireService.create(rq as RatingQuestionnaire);
    }

    //Create based on a nim and a lecture, note that the student HAS to take the lecture
    @Post("/:nim/rq/:id")
    @ResponseSchema(QuestionnaireResponse)
    @OpenAPI({
        description: "Create new questionnaire response from student with certain NIM for lecture with certain ID",
        responses: {
            "200": {
                description: "OK",
            },
            "400": {
                description: "Bad request",
            },
        },
    })
    public createLectureQuestionnaire(
        @Param("nim") nim: string,
        @Param("id") id: number,
        @Body() rq: CreateQuestionnaireBody){
        return this.questionnaireService.createByStudentNimLecture(nim, id, rq as RatingQuestionnaire);
    }

    @Put("/:id")
    @ResponseSchema(QuestionnaireResponse)
    @OpenAPI({
        description: "Update questionnaire, allows partial update",
        responses: {
          "200": {
            description: "OK",
          },
        },
      })
    public async updateQuestionnaire(
        @Param("id") id: number,
        @Body() rq: UpdateQuestionnaireBody
    ){
        return this.questionnaireService.update(id, rq as RatingQuestionnaire);
    }

    @Delete("/:id")
    @OpenAPI({
        description: "Delete questionnaire",
        responses: {
          "200": {
            description: "OK",
          },
        },
    })
    public removeQuestionnaire(@Param("id") id:number){
        return this.questionnaireService.delete(id);
    }
}