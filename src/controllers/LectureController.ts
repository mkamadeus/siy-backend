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
  constructor(private lectureService: LectureService) {
    this.lectureService = lectureService;
  }

  @Get("/")
  @ResponseSchema(LectureResponse, { isArray: true })
  @OpenAPI({
    description: "Get all Lectures",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getAllLectures() {
    return this.lectureService.getAll();
  }

  @Get("/:id")
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: "Get one Lecture",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getOneLecture(@Param("id") id: number) {
    return this.lectureService.getOne(id);
  }

  @Get("/course/:id")
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: "Get Lecture by course",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getLectureByCourse(@Param("id") id: number) {
    return this.lectureService.getByCourse(id);
  }

  @Get("/year/:year")
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: "Get Lecture by year",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getLectureByYear(@Param("year") year: number) {
    return this.lectureService.getByYear(year);
  }

  @Get("/year/:year/:semester")
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: "Get Lecture by year and semester",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getLectureByYearSemester(
    @Param("year") year: number,
    @Param("semester") semester: number
  ) {
    return this.lectureService.getByYearSemester(year, semester);
  }

  @Get("/co/:id/:lo")
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: "Get course outcome per LO by lecture id",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getCOperLO(@Param("id") id: number, @Param("lo") lo: string) {
    return this.lectureService.getCourseOutcomeLO(id, lo);
  }

  @Get("/co/:id")
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: "Get course outcome by lecture id",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getCO(@Param("id") id: number) {
    return this.lectureService.getCourseOutcome(id);
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
