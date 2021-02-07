import "reflect-metadata";
import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
} from "routing-controllers";
import { AssignmentService } from "@/services/AssignmentService";
import Assignment, { AssignmentType } from "@/entity/Assignment";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import {
  IsISO8601,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { CourseResponse } from "./CourseController";

export class AssignmentBase {
  @IsString()
  public title: string;

  @IsISO8601()
  public deadline: Date;

  @IsEnum(AssignmentType)
  public type: AssignmentType;
}

export class CreateAssignmentBody extends AssignmentBase {
  @IsNumber()
  public courseId: number;
}

export class AssignmentResponse extends AssignmentBase {
  @IsNumber()
  public id: number;

  @ValidateNested()
  public course: CourseResponse;
}

@JsonController("/assignments")
@OpenAPI({ security: [{ basicAuth: [] }] })
export class AssignmentController {
  constructor(private assignmentService: AssignmentService) {
    this.assignmentService = assignmentService;
  }

  @Get("/")
  @ResponseSchema(AssignmentResponse, { isArray: true })
  @OpenAPI({
    description: "Get all assignments",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async getAllAssignments(): Promise<AssignmentResponse[]> {
    return await this.assignmentService.getAll();
  }

  @Get("/:id")
  @ResponseSchema(AssignmentResponse)
  @OpenAPI({
    description: "Get assignment by ID",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async getAssignmentById(@Param("id") id: number) {
    return await this.assignmentService.getOne(id);
  }

  @Get("class/:id")
  @ResponseSchema(AssignmentResponse, { isArray: true })
  @OpenAPI({
    description: "Get assignment by ID",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async getAssignmentByClassId(@Param("id") id: number) {
    return await this.assignmentService.getByClass(id);
  }

  @Post("/")
  @ResponseSchema(AssignmentResponse)
  @OpenAPI({
    description: "Create new assignment",
    responses: {
      "200": {
        description: "OK",
      },
      "400": {
        description: "Bad request",
      },
    },
  })
  public createAssignment(@Body() assignment: CreateAssignmentBody) {
    return this.assignmentService.create(assignment as Assignment);
  }

  @Put("/:id")
  @ResponseSchema(AssignmentResponse)
  public updateAssignment(
    @Param("id") id: number,
    @Body() assignment: CreateAssignmentBody
  ) {
    return this.assignmentService.update(id, assignment as Assignment);
  }

  @Delete("/:id")
  public deleteAssignment(@Param("id") id: number) {
    return this.assignmentService.delete(id);
  }
}
