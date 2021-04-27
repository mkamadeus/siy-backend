import "reflect-metadata";
import Student from "@/entity/Student";
import { StudentService } from "@/services/StudentService";
import {
  Authorized,
  Body,
  Delete,
  Get,
  HeaderParam,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { StudentResponse } from "./response/StudentResponse";
import { CreateStudentBody, UpdateStudentBody } from "./request/StudentRequest";
import { UserRoleEnum } from "@/enum/UserRoleEnum";
import Container from "typedi";
import { StudentGradeService } from "@/services/StudentGradeService";
import { AuthService } from "@/services/AuthService";

@OpenAPI({
  security: [{ BasicAuth: [] }],
})
@JsonController("/students")
export class StudentController {
  constructor(
    private studentService: StudentService,
    private gradeService: StudentGradeService
  ) {
    this.studentService = Container.get(StudentService);
    this.gradeService = Container.get(StudentGradeService);
  }

  //@Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Get("/")
  @ResponseSchema(StudentResponse, { isArray: true })
  @OpenAPI({
    description: "Get all students with grades",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getAllStudents() {
    return this.studentService.getAll();
  }

  // @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Get("/nim/:nim")
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: "Get student data by NIM with grades",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getStudentByNIM(@Param("nim") nim: string) {
    return this.studentService.getByNim(nim);
  }

  //@Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Get("/nim/:nim/grades/:year")
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: "Get student grades by NIM",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getStudentGradeByYear(
    @Param("nim") nim: string,
    @Param("year") year: number
  ) {
    return this.gradeService.getByNimPerYear(nim, year);
  }

  @Get("/nim/:nim/grades/:year/:semester")
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
    @Param("nim") nim: string,
    @Param("year") year: number,
    @Param("semester") semester: number
  ) {
    return this.gradeService.getByNimPerSemester(nim, year, semester);
  }

  // @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Get("/nim/:nim/grades/")
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: "Get student grades by NIM",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getGradeThisSemester(@Param("nim") nim: string) {
    return this.gradeService.getByNim(nim);
  }

  //@Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
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

  //@Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
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

  //@Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
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
