import "reflect-metadata";
import Course from "@/entity/Course";
import { CourseService } from "@/services/CourseService";
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
import { CourseResponse } from "./response/CourseResponse";
import { CreateCourseBody, UpdateCourseBody } from "./request/CourseRequest";

@JsonController("/courses")
export class CourseController {
  constructor(private courseService: CourseService) {
    this.courseService = courseService;
  }

  @Get("/")
  @ResponseSchema(CourseResponse, { isArray: true })
  @OpenAPI({
    description: "Get all courses",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getAllCourses() {
    return this.courseService.getAll();
  }

  @Get("/:id")
  @ResponseSchema(CourseResponse)
  @OpenAPI({
    description: "Get course data by ID",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public getCourseById(@Param("id") id: number) {
    return this.courseService.getOne(id);
  }

  @Post("/")
  @ResponseSchema(CourseResponse)
  @OpenAPI({
    description: "Create new course",
    responses: {
      "200": {
        description: "OK",
      },
      "400": {
        description: "Bad request",
      },
    },
  })
  public createCourse(@Body() course: CreateCourseBody) {
    return this.courseService.create(course as Course);
  }

  @Put("/:id")
  @ResponseSchema(CourseResponse)
  @OpenAPI({
    description: "Update course, allows partial update",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async updateCourse(
    @Param("id") id: number,
    @Body() course: UpdateCourseBody
  ) {
    return await this.courseService.update(id, course as Course);
  }

  @Delete("/:id")
  @OpenAPI({
    description: "Delete course by ID",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public removeCourse(@Param("id") id: number) {
    return this.courseService.delete(id);
  }
}
