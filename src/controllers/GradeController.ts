import "reflect-metadata";
import StudentGrade from "@/entity/StudentGrade";
import { GradeService } from "@/services/GradeService";
import { IsNumber } from "class-validator";
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  UploadedFile,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { fileUploadOptions, UploadService } from "@/services/UploadService";

export class GradeBase {
  @IsNumber()
  public studentId: number;

  @IsNumber()
  public courseId: number;
}

export class CreateGradeBody extends GradeBase {
  @IsNumber()
  public studentId: number;

  @IsNumber()
  public courseId: number;
}

export class GradeResponse extends GradeBase {
  @IsNumber()
  public id: number;
}

@JsonController("/grades")
export class GradeController {
  constructor(
    private gradeService: GradeService,
    private uploadService: UploadService
  ) {}

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

  @Get("/std/:id")
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: "Get grade data by studentID",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getGradeByNIM(@Param("id") id: number) {
    return this.gradeService.getByStdID(id);
  }

  @Get("/:id")
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: "Get grade data by ID",
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

  @Post("/upload")
  public uploadGrade(
    @UploadedFile("file", { required: true, options: fileUploadOptions() })
    file: Express.Multer.File
  ) {
    // TODO: Fix upload grade using the excel function
    const fileContent = this.uploadService.parseExcel(file.filename);

    return;
  }

  @Put("/:id")
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: "Update grade",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public updateGrade(@Param("id") id: number, @Body() grade: CreateGradeBody) {
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
