import "reflect-metadata";
import StudentGrade from "@/entity/StudentGrade";
import { StudentGradeService } from "@/services/StudentGradeService";
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
import { GradeResponse } from "./response/StudentGradeResponse";
import {
  CreateGradeBody,
  CreateGradeByNimBody,
  UpdateGradeBody,
} from "./request/StudentGradeRequest";
import Container from "typedi";
import { StudentService } from "@/services/StudentService";
import { reset } from "chalk";

@JsonController("/grades")
export class GradeController {
  constructor(private gradeService: StudentGradeService) {
    this.gradeService = gradeService;
  }

  @Get("/")
  @ResponseSchema(GradeResponse, { isArray: true })
  @OpenAPI({
    description: "Get all grades",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async getAllGrades() {
    return await this.gradeService.getAll();
  }

  @Get("/student/:nim")
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: "Get grade data by NIM",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async getGradeByNim(@Param("nim") nim: string) {
    return await this.gradeService.getByNim(nim);
  }

  @Get("/:id")
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: "Get grade data by grade ID",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async getGradeById(@Param("id") id: number) {
    return await this.gradeService.getOne(id);
  }

  @Post("/")
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: "Create new grade",
    responses: {
      "200": {
        description: "OK",
      },
      "400": {
        description: "Bad request",
      },
    },
  })
  public async createGrade(@Body() grade: CreateGradeBody) {
    return await this.gradeService.create(grade as StudentGrade);
  }

  @Post("/student/:nim")
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: "Create new grade by NIM",
    responses: {
      "200": {
        description: "OK",
      },
      "400": {
        description: "Bad request",
      },
    },
  })
  public async createGradeByNim(
    @Param("nim") nim: string,
    @Body() grade: CreateGradeByNimBody
  ) {
    return this.gradeService.createByNim(nim, grade as StudentGrade);
  }

  @Put("/:id")
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: "Update grade, allows partial update.",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public updateGrade(@Param("id") id: number, @Body() grade: UpdateGradeBody) {
    return this.gradeService.update(id, grade as StudentGrade);
  }

  @Delete("/:id")
  @OpenAPI({
    description: "Delete grade",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public removeGrade(@Param("id") id: number) {
    return this.gradeService.delete(id);
  }
}
