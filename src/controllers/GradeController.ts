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
  UpdateGradeBody,
} from "./request/StudentGradeRequest";

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
  public getAllGrades() {
    return this.gradeService.getAll();
  }

  @Get("/student/:id")
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: "Get grade data by student ID",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getGradeByStudentId(@Param("id") id: string) {
    return this.gradeService.getByNim(id);
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
  public getGradeById(@Param("id") id: number) {
    return this.gradeService.getOne(id);
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
  public createGrade(@Body() grade: CreateGradeBody) {
    return this.gradeService.create(grade as StudentGrade);
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
