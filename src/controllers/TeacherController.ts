import "reflect-metadata";
import Teacher from "@/entity/Teacher";
import {
  Authorized,
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { TeacherService } from "@/services/TeacherService";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { TeacherResponse } from "./response/TeacherResponse";
import { CreateTeacherBody, UpdateTeacherBody } from "./request/TeacherRequest";
import { UserRoleEnum } from "@/enum/UserRoleEnum";

@JsonController("/teachers")
export class TeacherController {
  constructor(private teacherService: TeacherService) {
    this.teacherService = teacherService;
  }

  @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Get("/")
  @ResponseSchema(TeacherResponse, { isArray: true })
  @OpenAPI({
    description: "Get all teachers",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getAllTeachers() {
    return this.teacherService.getAll();
  }

  @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Get("/:id")
  @ResponseSchema(TeacherResponse)
  @OpenAPI({
    description: "Get teacher data by ID",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getTeacherById(@Param("id") id: number) {
    return this.teacherService.getOne(id);
  }

  @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Post("/")
  @ResponseSchema(TeacherResponse)
  @OpenAPI({
    description: "Create new teacher",
    responses: {
      "200": {
        description: "OK",
      },
      "400": {
        description: "Bad request",
      },
    },
  })
  public createTeacher(@Body() teacher: CreateTeacherBody) {
    return this.teacherService.create(teacher as Teacher);
  }

  @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Put("/:id")
  @ResponseSchema(TeacherResponse)
  @OpenAPI({
    description: "Update teacher",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async updateTeacher(
    @Param("id") id: number,
    @Body() teacher: UpdateTeacherBody
  ) {
    return await this.teacherService.update(id, teacher as Teacher);
  }

  @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Delete("/:id")
  @OpenAPI({
    description: "Delete teacher by ID",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public removeTeacher(@Param("id") id: number) {
    return this.teacherService.delete(id);
  }
}
