import "reflect-metadata";
import Lecture from "@/entity/Lecture";
import { LectureService } from "@/services/LectureService";
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { LectureResponse } from "./response/LectureResponse";
import { CreateLectureBody, UpdateLectureBody } from "./request/LectureRequest";

@JsonController("/lectures")
export class LectureController {
  constructor(private lectureService:LectureService) {
    this.lectureService = lectureService;
  }

  @Get("/id")
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: "Get one Lectures",
    responses: {
      "200" : {
        description:"OK",
      },
    },
  })
  public getOneLectures(@Param("id") id: number) {
    return this.lectureService.getOne(id);
  }

  @Get("/")
  @ResponseSchema(LectureResponse, {isArray:true})
  @OpenAPI({
    description: "Get all Lectures",
    responses: {
      "200" : {
        description:"OK",
      },
    },
  })
  public getAllLectures() {
    return this.lectureService.getAll();
  }




  @Post("/")
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: "Create new lecture",
    responses: {
      "200": {
        description: "OK",
      },
      "400": {
        description: "Bad request",
      },
    },
  })
  public createLecture(@Body() lecture: CreateLectureBody) {
    return this.lectureService.create(lecture as Lecture);
  }

  @Put("/:id")
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: "Update lecture, allows partial update",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async updateLecture(
    @Param("id") id: number,
    @Body() lecture: UpdateLectureBody
  ) {
    return await this.lectureService.update(id, lecture as Lecture);
  }

  @Delete("/:id")
  @OpenAPI({
    description: "Delete lecture by ID",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public removeLecture(@Param("id") id: number) {
    return this.lectureService.delete(id);
  }
}
