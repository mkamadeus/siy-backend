import LOSupplement from "@/entity/LOSupplement";
import LOSupplementService from "@/services/LOSupplementService";
import { IsNumber, IsOptional } from "class-validator";
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

export class CreateLOBody {
  @IsNumber()
  studentId: number;

  @IsNumber()
  courseId: number;

  @IsNumber()
  year: number;

  @IsNumber()
  semester: number;

  @IsNumber()
  loA: number;

  @IsNumber()
  loB: number;

  @IsNumber()
  loC: number;

  @IsNumber()
  loD: number;

  @IsNumber()
  loE: number;

  @IsNumber()
  loF: number;

  @IsNumber()
  loG: number;
}

export class UpdateLOBody {
  @IsOptional()
  @IsNumber()
  studentId: number;

  @IsOptional()
  @IsNumber()
  courseId: number;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsNumber()
  semester: number;

  @IsOptional()
  @IsNumber()
  loA: number;

  @IsOptional()
  @IsNumber()
  loB: number;

  @IsOptional()
  @IsNumber()
  loC: number;

  @IsOptional()
  @IsNumber()
  loD: number;

  @IsOptional()
  @IsNumber()
  loE: number;

  @IsOptional()
  @IsNumber()
  loF: number;

  @IsOptional()
  @IsNumber()
  loG: number;
}

export class LoResponse {
  @IsNumber()
  studentId: number;

  @IsNumber()
  courseId: number;

  @IsNumber()
  year: number;

  @IsNumber()
  semester: number;

  @IsNumber()
  loA: number;

  @IsNumber()
  loB: number;

  @IsNumber()
  loC: number;

  @IsNumber()
  loD: number;

  @IsNumber()
  loE: number;

  @IsNumber()
  loF: number;

  @IsNumber()
  loG: number;
}

@JsonController("/lo")
@OpenAPI({ security: [{ basicAuth: [] }] })
export default class LOSupplementController {
  constructor(private loService: LOSupplementService) {}

  @Get("/")
  @ResponseSchema(LoResponse, { isArray: true })
  @OpenAPI({
    description: "Get all students LO",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async getAllLO() {
    return await this.loService.getAll();
  }

  @Get("/:id")
  @ResponseSchema(LoResponse)
  @OpenAPI({
    description: "Get LO by ID",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async getLoById(@Param("id") id: number) {
    return await this.loService.getOne(id);
  }

  @Get("/student/:studentId")
  @ResponseSchema(LoResponse, { isArray: true })
  @OpenAPI({
    description: "Get all LO by student ID",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async getLoByStudentId(@Param("studentId") studentId: number) {
    return await this.loService.getByStudentId(studentId);
  }

  @Post("/")
  @ResponseSchema(LoResponse)
  @OpenAPI({
    description: "Create new LO entry.",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async createLo(@Body() loBody: CreateLOBody) {
    return await this.loService.create(loBody as LOSupplement);
  }

  @Put("/:id")
  @ResponseSchema(LoResponse)
  @OpenAPI({
    description: "Update existing LO entry; allows partial update.",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async updateLo(@Param("id") id: number, @Body() loBody: UpdateLOBody) {
    return await this.loService.update(id, loBody as LOSupplement);
  }

  @Delete("/:id")
  @ResponseSchema(LoResponse)
  @OpenAPI({
    description: "Delete existing LO entry.",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async deleteLo(@Param("id") id: number) {
    return await this.loService.delete(id);
  }
}
