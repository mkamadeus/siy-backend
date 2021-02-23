import "reflect-metadata";
import StudentGrade from "@/entity/StudentGrade";
import { GradeService } from "@/services/GradeService";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
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
import { IndexEnum } from "@/enum/IndexEnum";

export class GradeBase {
  @IsNumber()
  public studentId: number;

  @IsNumber()
  public courseId: number;
}

export class CreateGradeBody {
  @IsNumber()
  public studentId: number;

  @IsNumber()
  public courseId: number;

  @IsEnum(IndexEnum)
  public indeks: string;

  @IsNumber()
  public semester: number;

  @IsNumber()
  public year: number;
}
export class UpdateGradeBody {
  @IsNumber()
  @IsOptional()
  public studentId: number;

  @IsNumber()
  @IsOptional()
  public courseId: number;

  @IsEnum(IndexEnum)
  @IsOptional()
  public indeks: string;

  @IsNumber()
  @IsOptional()
  public semester: number;

  @IsNumber()
  @IsOptional()
  public year: number;
}

export class GradeResponse {
  @IsNumber()
  public id: number;

  @IsNumber()
  public studentId: number;

  @IsEnum(IndexEnum)
  public indeks: string;

  @IsNumber()
  public courseId: number;

  @IsNumber()
  public semester: number;

  @IsNumber()
  public year: number;
}

@JsonController("/grades")
export class GradeController {
  constructor(private gradeService: GradeService) {
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
  public getGradeByStudentId(@Param("id") id: number) {
    return this.gradeService.getByStdID(id);
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
