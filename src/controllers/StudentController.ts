import "reflect-metadata";
import Student from "@/entity/Student";
import { StudentService } from "@/services/StudentService";
import { IsNumber, IsOptional, IsString } from "class-validator";
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

export class StudentBase {
  @IsNumber()
  public nim: number;

  @IsString()
  public name: string;
}

export class CreateStudentBody extends StudentBase {
  @IsNumber()
  public nim: number;

  @IsString()
  public name: string;
}

export class UpdateStudentBody extends StudentBase {
  @IsOptional()
  @IsNumber()
  public nim: number;

  @IsOptional()
  @IsString()
  public name: string;
}

export class StudentResponse {
  @IsNumber()
  public id: number;

  @IsNumber()
  public nim: number;

  @IsString()
  public name: string;

  @IsString()
  public imgPath: string;

  @IsNumber()
  public ipk: number;
}

@JsonController("/students")
export class StudentController {
  constructor(private studentService: StudentService) {
    this.studentService = studentService;
  }

  @Get("/")
  @ResponseSchema(StudentResponse, { isArray: true })
  @OpenAPI({
    description: "Get all assignments",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getAllStudents() {
    return this.studentService.getAll();
  }

  @Get("/nim/:id")
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: "Get student data by NIM",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getStudentByNIM(@Param("id") id: number) {
    return this.studentService.getByNIM(id);
  }

  @Get("/grades/:nim/:year/:semester")
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: "Get student grades by NIM",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getStudentGradeBySemester(
    @Param("nim") nim: number,
    @Param("year") year: number,
    @Param("semester") semester: number
  ) {
    return this.studentService.getGradeBySemester(nim, year, semester);
  }

  @Get("/grades/:nim")
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: "Get student grades by NIM",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getGradeThisSemester(@Param("nim") nim: number) {
    return this.studentService.getGradeByNIM(nim);
  }

  @Get("/ip/:nim")
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: "Get student grades by NIM",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getStudentIP(@Param("nim") nim: number) {
    return this.studentService.getIP(nim);
  }

  @Get("/nr/:nim/:year/:semester")
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: "Get student grades by NIM",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getStudentNR(
    @Param("nim") nim: number,
    @Param("year") year: number,
    @Param("semester") semester: number
  ) {
    return this.studentService.getNR(nim, year, semester);
  }

  @Get("/:id")
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: "Get student data by ID",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getStudentById(@Param("id") id: number) {
    return this.studentService.getOne(id);
  }

  @Post("/")
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: "Create new student",
    responses: {
      "200": {
        description: "OK",
      },
      "400": {
        description: "Bad request",
      },
    },
  })
  public createStudent(@Body() student: CreateStudentBody) {
    return this.studentService.create(student as Student);
  }

  @Put("/:id")
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: "Update student, allows partial update",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public updateStudent(
    @Param("id") id: number,
    @Body() student: UpdateStudentBody
  ) {
    return this.studentService.update(id, student as Student);
  }

  @Delete("/:id")
  @OpenAPI({
    description: "Delete student",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public removeStudent(@Param("id") id: number) {
    return this.studentService.delete(id);
  }
}
