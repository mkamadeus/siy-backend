import "reflect-metadata";
import Teaches from "@/entity/Teaches";
import {
  Get,
  JsonController,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Authorized,
} from "routing-controllers";
import { TeachesService } from "@/services/TeachesService";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { TeachesResponse } from "./response/TeachesResponse";
import { CreateTeachesBody, UpdateTeachesBody } from "./request/TeachesRequest";
import { UserRoleEnum } from "@/enum/UserRoleEnum";

@JsonController("/teaches")
export class TeachesController {
  constructor(private teachesService: TeachesService) {
    this.teachesService = teachesService;
  }

  @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Get("/")
  @ResponseSchema(TeachesResponse, { isArray: true })
  @OpenAPI({
    description: "Get all teaching information",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getAllTeaches() {
    return this.teachesService.getAll();
  }

  @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Get("/:id")
  @ResponseSchema(TeachesResponse)
  @OpenAPI({
    description: "Get one teaching information by ID",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getTeachesById(@Param("id") id: number) {
    return this.teachesService.getOne(id);
  }

  @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Get("/teacher/:id")
  @ResponseSchema(TeachesResponse)
  @OpenAPI({
    description: "Get teaching information of a teacher",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getTeachesByTeacher(@Param("id") id: number) {
    return this.teachesService.getByTeacherId(id);
  }

  @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Get("/lecture/:id")
  @ResponseSchema(TeachesResponse)
  @OpenAPI({
    description: "Get teaching information for a lecture",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getTeachesByLecture(@Param("id") id: number) {
    return this.teachesService.getByLectureId(id);
  }

  @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Post("/")
  @ResponseSchema(TeachesResponse)
  @OpenAPI({
    description: "Create new teaching information",
    responses: {
      "200": {
        description: "OK",
      },
      "400": {
        description: "Bad request",
      },
    },
  })
  public createTeaches(@Body() teaches: CreateTeachesBody) {
    return this.teachesService.create(teaches as Teaches);
  }

  //TODO: Is this necessary?
  @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Put("/:id")
  @ResponseSchema(TeachesResponse)
  @OpenAPI({
    description: "Update teaching information",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async updateTeaches(
    @Param("id") id: number,
    @Body() teaches: UpdateTeachesBody
  ) {
    return await this.teachesService.update(id, teaches as Teaches);
  }

  @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Delete("/:id")
  @OpenAPI({
    description: "Delete teaching information by ID",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public removeTeaches(@Param("id") id: number) {
    return this.teachesService.delete(id);
  }
}
